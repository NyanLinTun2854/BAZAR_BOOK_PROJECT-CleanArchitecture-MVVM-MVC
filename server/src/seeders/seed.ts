import * as dotenv from "dotenv";
import mongoose, { Types } from "mongoose";
import * as bcrypt from "bcryptjs";
import slugify from "slugify";

// --- IMPORTANT: Adjust these paths to your actual model files ---
import AdminUser from "@mongo/adminUser.mongo";
import User from "@mongo/user.mongo";
import Author from "@mongo/author.mongo";
import Category from "@mongo/category.mongo";
import Vendor from "@mongo/vendor.mongo";
import Product from "@mongo/product.mongo";
import Promotion from "@mongo/promotion.mongo";
import UserFavorite from "@mongo/userFavourite.mongo";

// Load environment variables
dotenv.config({ path: "../.env" });

// --- Configuration & Helpers ---
// Use the environment variable if available, otherwise use the hardcoded string
const MONGO_URI =
  process.env.MONGO_URL ||
  "mongodb+srv://NyanLinTun:UESmFC7gQ3dmDmX@clustern.o1vnxfo.mongodb.net/bazar?retryWrites=true&w=majority&appName=CusterN";

const ADMIN_PASSWORD = "Password123!";
const DEFAULT_USER_PASSWORD = "UserPassword123";

async function seedDatabase() {
  let connection: typeof mongoose | null = null;
  // Declare the session variable outside the try block
  let session: mongoose.ClientSession | null = null;

  try {
    // 1. Establish the connection FIRST
    connection = await mongoose.connect(MONGO_URI!);
    console.log("🌱 MongoDB connected for seeding.");

    // 2. NOW, start the session/transaction on the established connection
    session = await connection.startSession();
    session.startTransaction();

    // --- 0. HASH PASSWORDS ---
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const userHashedPassword = await bcrypt.hash(DEFAULT_USER_PASSWORD, 10);

    // --- 1. SEED DEPENDENCY 1: ADMIN USER ---
    let superAdmin = await AdminUser.findOne({
      email: "superadmin@example.com",
    }).session(session);
    if (!superAdmin) {
      const [newAdmin] = await AdminUser.create(
        [
          {
            first_name: "Super",
            last_name: "Admin",
            email: "superadmin@example.com",
            role: "SUPER_ADMIN",
            email_verified: "verified",
            password: hashedPassword,
          },
        ],
        { session }
      );
      superAdmin = newAdmin;
      console.log("✅ Super Admin user seeded.");
    } else {
      console.log("⚠️ Super Admin exists. Skipping creation.");
    }
    const adminId: Types.ObjectId = superAdmin._id;

    // --- 2. SEED DEPENDENCY 2: STANDARD USER ---
    let defaultUser = await User.findOne({ email: "user@example.com" }).session(
      session
    );
    if (!defaultUser) {
      const [newUser] = await User.create(
        [
          {
            name: "John Doe",
            email: "user@example.com",
            role: "CUSTOMER",
            email_verified: "verified",
            password: userHashedPassword,
          },
        ],
        { session }
      );
      defaultUser = newUser;
      console.log("✅ Default Customer user seeded.");
    } else {
      console.log("⚠️ Customer user exists. Skipping creation.");
    }
    const userId: Types.ObjectId = defaultUser._id;

    // --- 3. SEED DEPENDENCY 3: AUTHOR, VENDOR, CATEGORY ---
    const [newAuthor] = await Author.create(
      [{ name: "J.R.R. Tolkien", bio: "Fantasy writer.", image_url: "url" }],
      { session }
    );
    const [newVendor] = await Vendor.create(
      [
        {
          name: "BookHaven Ltd",
          contact_email: "contact@bookhaven.com",
          is_active: true,
          created_by_admin_id: adminId,
        },
      ],
      { session }
    );
    const categoryName = "Fantasy";
    const [newCategory] = await Category.create(
      [
        {
          name: categoryName,
          slug: slugify(categoryName, { lower: true }),
          created_by_admin_id: adminId,
        },
      ],
      { session }
    );

    console.log("✅ Author, Vendor, Category seeded.");
    const authorId: Types.ObjectId = newAuthor._id;
    const vendorId: Types.ObjectId = newVendor._id; // Capture vendorId
    const categoryId: Types.ObjectId = newCategory._id;

    // --- 4. SEED DEPENDENCY 4: PRODUCT ---
    const [newProduct] = await Product.create(
      [
        {
          title: "The Hobbit",
          author_id: authorId,
          description: "A classic fantasy novel.",
          price: 15.5,
          stock: 100,
          category: categoryId,
          vendor_id: vendorId, // Added vendor_id
          image_url: "url",
          created_by_admin_id: adminId,
        },
      ],
      { session }
    );
    console.log("✅ Product seeded.");
    const productId: Types.ObjectId = newProduct._id;

    // --- 5. SEED DEPENDENCY 5: PROMOTION & FAVORITE ---
    await Promotion.create(
      [
        {
          code: "WELCOME20",
          type: "percent",
          value: 20,
          start_date: new Date(),
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
          is_active: true,
        },
      ],
      { session }
    );

    await UserFavorite.create(
      [
        {
          user_id: userId,
          product_id: productId,
        },
      ],
      { session } // Ensure all model operations use the session
    );

    console.log("✅ Promotion and UserFavorite seeded.");

    await session.commitTransaction();
    console.log("🌿 Database Seeding Complete and committed.");
  } catch (error) {
    console.error("❌ Database Seeding Failed. Attempting rollback...");
    if (session && session.inTransaction()) {
      await session.abortTransaction();
      console.log("Rollback successful.");
    }
    console.error("Details:", error);
    process.exit(1);
  } finally {
    // 3. Always end the session and disconnect
    if (session) {
      await session.endSession();
    }
    if (connection) {
      await mongoose.disconnect();
    }
  }
}

// seedDatabase();
