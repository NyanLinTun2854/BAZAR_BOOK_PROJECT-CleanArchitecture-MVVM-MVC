module.exports = {
  /**
   * @param db {import('mongodb').Db} The native MongoDB database object
   * @returns {Promise<void>}
   */
  async up(db) {
    console.log(
      "Applying: Initial schema setup (9 collections and 11 indexes)..."
    );

    // --- 1. AdminUser Collection ---
    await db.createCollection("adminusers"); // Mongoose model 'AdminUser' -> collection 'adminusers'
    await db
      .collection("adminusers")
      .createIndex(
        { email: 1 },
        { unique: true, name: "admin_email_unique_index" }
      );

    // --- 2. AdminUserOTP Collection ---
    await db.createCollection("adminuserotps"); // Mongoose model 'AdminUserOTP' -> collection 'adminuserotps'
    await db.collection("adminuserotps").createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 60 * 3, name: "otp_ttl_index" } // TTL Index (3 minutes)
    );

    // --- 3. User Collection ---
    await db.createCollection("users"); // Mongoose model 'User' -> collection 'users'
    await db
      .collection("users")
      .createIndex(
        { email: 1 },
        { unique: true, name: "user_email_unique_index" }
      );

    // --- 4. Author Collection ---
    await db.createCollection("authors"); // Mongoose model 'Author' -> collection 'authors'
    await db
      .collection("authors")
      .createIndex(
        { name: 1 },
        { unique: true, name: "author_name_unique_index" }
      );

    // --- 5. Category Collection ---
    await db.createCollection("categories"); // Mongoose model 'Category' -> collection 'categories'
    await db
      .collection("categories")
      .createIndex(
        { name: 1 },
        { unique: true, name: "category_name_unique_index" }
      );
    await db
      .collection("categories")
      .createIndex(
        { slug: 1 },
        { unique: true, name: "category_slug_unique_index" }
      );

    // --- 6. Product Collection ---
    await db.createCollection("products"); // Mongoose model 'Product' -> collection 'products'
    // No unique indexes specific to Product itself are defined in your schema.

    // --- 7. Order Collection ---
    await db.createCollection("orders"); // Mongoose model 'Order' -> collection 'orders'
    await db
      .collection("orders")
      .createIndex(
        { order_number: 1 },
        { unique: true, name: "order_number_unique_index" }
      );

    // --- 8. Promotion Collection ---
    await db.createCollection("promotions"); // Mongoose model 'Promotion' -> collection 'promotions'
    await db
      .collection("promotions")
      .createIndex(
        { code: 1 },
        { unique: true, name: "promotion_code_unique_index" }
      );

    // --- 9. Vendor Collection ---
    await db.createCollection("vendors"); // Mongoose model 'Vendor' -> collection 'vendors'
    await db
      .collection("vendors")
      .createIndex(
        { name: 1 },
        { unique: true, name: "vendor_name_unique_index" }
      );
    await db
      .collection("vendors")
      .createIndex(
        { contact_email: 1 },
        { unique: true, name: "vendor_email_unique_index" }
      );

    // --- 10. UserFavorite Collection ---
    await db.createCollection("userfavorites"); // Mongoose model 'UserFavorite' -> collection 'userfavorites'
    // Compound index to ensure unique (user_id, product_id) pair
    await db
      .collection("userfavorites")
      .createIndex(
        { user_id: 1, product_id: 1 },
        { unique: true, name: "user_product_favorite_unique_index" }
      );

    console.log("Initial schema setup complete.");
  },

  /**
   * @param db {import('mongodb').Db} The native MongoDB database object
   * @returns {Promise<void>}
   */
  async down(db) {
    console.log("Reverting: Dropping all initial collections...");

    // Drop all 10 collections created in the 'up' migration
    await db.collection("adminusers").drop();
    await db.collection("adminuserotps").drop();
    await db.collection("users").drop();
    await db.collection("authors").drop();
    await db.collection("categories").drop();
    await db.collection("products").drop();
    await db.collection("orders").drop();
    await db.collection("promotions").drop();
    await db.collection("vendors").drop();
    await db.collection("userfavorites").drop();

    console.log("Reversion complete.");
  },
};
