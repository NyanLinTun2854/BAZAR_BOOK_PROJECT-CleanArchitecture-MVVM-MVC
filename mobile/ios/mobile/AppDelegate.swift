import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

// Make sure you have created the Bridging Header and added the import for RNSplashScreen.h there.

@main
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    
    // 1. Existing React Native setup
    self.moduleName = "mobile"
    self.dependencyProvider = RCTAppDependencyProvider()
    self.initialProps = [:]

    let didFinish = super.application(application, didFinishLaunchingWithOptions: launchOptions)
    
    // 2. Call the RNSplashScreen show method AFTER calling super.application
    // This is the standard call:
    RNSplashScreen.show()
    
    // OR, if you want to explicitly name the launch screen (like you saw in the Objective-C example):
    // if let rootView = self.window?.rootViewController?.view {
    //    RNSplashScreen.showSplash("LaunchScreen", inRootView: rootView)
    // }
    
    return didFinish
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
