import { storage } from "./storage";
import bcrypt from "bcrypt";

export async function initializeAdmin() {
  try {
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
      console.error("⚠️  SECURITY WARNING: ADMIN_PASSWORD environment variable is not set!");
      console.error("⚠️  Admin user initialization skipped. Please set ADMIN_USERNAME and ADMIN_PASSWORD environment variables.");
      console.error("⚠️  In production, never use default credentials!");
      return;
    }
    
    const existingAdmin = await storage.getUserByUsername(adminUsername);
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await storage.createUser({
        username: adminUsername,
        password: hashedPassword,
      });
      console.log(`✓ Admin user created with username: ${adminUsername}`);
      console.log("⚠️  Make sure to change your admin credentials after first login!");
    } else {
      console.log("✓ Admin user already exists");
    }
  } catch (error) {
    console.error("Error initializing admin user:", error);
  }
}
