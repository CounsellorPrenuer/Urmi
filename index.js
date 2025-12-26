var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  blogs: () => blogs,
  contactSubmissions: () => contactSubmissions,
  insertBlogSchema: () => insertBlogSchema,
  insertContactSubmissionSchema: () => insertContactSubmissionSchema,
  insertMentoriaPackageSchema: () => insertMentoriaPackageSchema,
  insertPackageSchema: () => insertPackageSchema,
  insertPaymentTrackingSchema: () => insertPaymentTrackingSchema,
  insertRazorpayOrderSchema: () => insertRazorpayOrderSchema,
  insertTestimonialSchema: () => insertTestimonialSchema,
  insertUserSchema: () => insertUserSchema,
  mentoriaPackages: () => mentoriaPackages,
  packages: () => packages,
  paymentTracking: () => paymentTracking,
  razorpayOrders: () => razorpayOrders,
  testimonials: () => testimonials,
  users: () => users
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  purpose: text("purpose").notNull(),
  message: text("message").notNull(),
  briefMessage: text("brief_message"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var blogs = pgTable("blogs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var packages = pgTable("packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  duration: text("duration").notNull(),
  features: text("features").array().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var paymentTracking = pgTable("payment_tracking", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  razorpayOrderId: text("razorpay_order_id"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  packageId: varchar("package_id").notNull(),
  packageName: text("package_name").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var razorpayOrders = pgTable("razorpay_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  razorpayOrderId: text("razorpay_order_id").notNull().unique(),
  packageId: varchar("package_id").notNull(),
  packageName: text("package_name").notNull(),
  amount: integer("amount").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  status: text("status").notNull().default("created"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var mentoriaPackages = pgTable("mentoria_packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  category: text("category").notNull(),
  features: text("features").array().notNull(),
  isPopular: boolean("is_popular").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true
});
var insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true
});
var insertBlogSchema = createInsertSchema(blogs).omit({
  id: true,
  createdAt: true
});
var insertPackageSchema = createInsertSchema(packages).omit({
  id: true,
  createdAt: true
});
var insertPaymentTrackingSchema = createInsertSchema(paymentTracking).omit({
  id: true,
  createdAt: true
});
var insertRazorpayOrderSchema = createInsertSchema(razorpayOrders).omit({
  id: true,
  createdAt: true
});
var insertMentoriaPackageSchema = createInsertSchema(mentoriaPackages).omit({
  id: true,
  createdAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
var DatabaseStorage = class {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async createContactSubmission(insertSubmission) {
    const [submission] = await db.insert(contactSubmissions).values(insertSubmission).returning();
    return submission;
  }
  async getContactSubmissions() {
    return await db.select().from(contactSubmissions);
  }
  async createTestimonial(insertTestimonial) {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }
  async getTestimonials() {
    return await db.select().from(testimonials);
  }
  async getTestimonial(id) {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial || void 0;
  }
  async updateTestimonial(id, data) {
    const [testimonial] = await db.update(testimonials).set(data).where(eq(testimonials.id, id)).returning();
    return testimonial;
  }
  async deleteTestimonial(id) {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }
  async createBlog(insertBlog) {
    const [blog] = await db.insert(blogs).values(insertBlog).returning();
    return blog;
  }
  async getBlogs() {
    return await db.select().from(blogs);
  }
  async getBlog(id) {
    const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));
    return blog || void 0;
  }
  async updateBlog(id, data) {
    const [blog] = await db.update(blogs).set(data).where(eq(blogs.id, id)).returning();
    return blog;
  }
  async deleteBlog(id) {
    await db.delete(blogs).where(eq(blogs.id, id));
  }
  async createPackage(insertPackage) {
    const [pkg] = await db.insert(packages).values(insertPackage).returning();
    return pkg;
  }
  async getPackages() {
    return await db.select().from(packages);
  }
  async getPackage(id) {
    const [pkg] = await db.select().from(packages).where(eq(packages.id, id));
    return pkg || void 0;
  }
  async updatePackage(id, data) {
    const [pkg] = await db.update(packages).set(data).where(eq(packages.id, id)).returning();
    return pkg;
  }
  async deletePackage(id) {
    await db.delete(packages).where(eq(packages.id, id));
  }
  async createPaymentTracking(insertPayment) {
    const [payment] = await db.insert(paymentTracking).values(insertPayment).returning();
    return payment;
  }
  async getPaymentTrackings() {
    return await db.select().from(paymentTracking);
  }
  async getPaymentTracking(id) {
    const [payment] = await db.select().from(paymentTracking).where(eq(paymentTracking.id, id));
    return payment || void 0;
  }
  async getPaymentTrackingByOrderId(razorpayOrderId) {
    const [payment] = await db.select().from(paymentTracking).where(eq(paymentTracking.razorpayOrderId, razorpayOrderId));
    return payment || void 0;
  }
  async updatePaymentTracking(id, data) {
    const [payment] = await db.update(paymentTracking).set(data).where(eq(paymentTracking.id, id)).returning();
    return payment;
  }
  async updatePaymentTrackingStatus(razorpayOrderId, status) {
    const [payment] = await db.update(paymentTracking).set({ status }).where(eq(paymentTracking.razorpayOrderId, razorpayOrderId)).returning();
    return payment;
  }
  async deletePaymentTracking(id) {
    await db.delete(paymentTracking).where(eq(paymentTracking.id, id));
  }
  async createRazorpayOrder(insertOrder) {
    const [order] = await db.insert(razorpayOrders).values(insertOrder).returning();
    return order;
  }
  async getRazorpayOrderByOrderId(razorpayOrderId) {
    const [order] = await db.select().from(razorpayOrders).where(eq(razorpayOrders.razorpayOrderId, razorpayOrderId));
    return order || void 0;
  }
  async updateRazorpayOrderStatus(razorpayOrderId, status) {
    const [order] = await db.update(razorpayOrders).set({ status }).where(eq(razorpayOrders.razorpayOrderId, razorpayOrderId)).returning();
    return order;
  }
  async createMentoriaPackage(insertPackage) {
    const [pkg] = await db.insert(mentoriaPackages).values(insertPackage).returning();
    return pkg;
  }
  async getMentoriaPackages() {
    return await db.select().from(mentoriaPackages);
  }
  async getActiveMentoriaPackages() {
    return await db.select().from(mentoriaPackages).where(eq(mentoriaPackages.isActive, true));
  }
  async getMentoriaPackage(id) {
    const [pkg] = await db.select().from(mentoriaPackages).where(eq(mentoriaPackages.id, id));
    return pkg || void 0;
  }
  async updateMentoriaPackage(id, data) {
    const [pkg] = await db.update(mentoriaPackages).set(data).where(eq(mentoriaPackages.id, id)).returning();
    return pkg;
  }
  async deleteMentoriaPackage(id) {
    await db.delete(mentoriaPackages).where(eq(mentoriaPackages.id, id));
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import bcrypt from "bcrypt";

// server/objectStorage.ts
import { Storage } from "@google-cloud/storage";
import { randomUUID } from "crypto";

// server/objectAcl.ts
var ACL_POLICY_METADATA_KEY = "custom:aclPolicy";
async function setObjectAclPolicy(objectFile, aclPolicy) {
  const [exists] = await objectFile.exists();
  if (!exists) {
    throw new Error(`Object not found: ${objectFile.name}`);
  }
  await objectFile.setMetadata({
    metadata: {
      [ACL_POLICY_METADATA_KEY]: JSON.stringify(aclPolicy)
    }
  });
}
async function getObjectAclPolicy(objectFile) {
  const [metadata] = await objectFile.getMetadata();
  const aclPolicy = metadata?.metadata?.[ACL_POLICY_METADATA_KEY];
  if (!aclPolicy) {
    return null;
  }
  return JSON.parse(aclPolicy);
}
async function canAccessObject({
  userId,
  objectFile,
  requestedPermission
}) {
  const aclPolicy = await getObjectAclPolicy(objectFile);
  if (!aclPolicy) {
    return false;
  }
  if (aclPolicy.visibility === "public" && requestedPermission === "read" /* READ */) {
    return true;
  }
  if (!userId) {
    return false;
  }
  if (aclPolicy.owner === userId) {
    return true;
  }
  return false;
}

// server/objectStorage.ts
var REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";
var objectStorageClient = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: {
        type: "json",
        subject_token_field_name: "access_token"
      }
    },
    universe_domain: "googleapis.com"
  },
  projectId: ""
});
var ObjectNotFoundError = class _ObjectNotFoundError extends Error {
  constructor() {
    super("Object not found");
    this.name = "ObjectNotFoundError";
    Object.setPrototypeOf(this, _ObjectNotFoundError.prototype);
  }
};
var ObjectStorageService = class {
  constructor() {
  }
  // Gets the public object search paths.
  getPublicObjectSearchPaths() {
    const pathsStr = process.env.PUBLIC_OBJECT_SEARCH_PATHS || "";
    const paths = Array.from(
      new Set(
        pathsStr.split(",").map((path3) => path3.trim()).filter((path3) => path3.length > 0)
      )
    );
    if (paths.length === 0) {
      throw new Error(
        "PUBLIC_OBJECT_SEARCH_PATHS not set. Create a bucket in 'Object Storage' tool and set PUBLIC_OBJECT_SEARCH_PATHS env var (comma-separated paths)."
      );
    }
    return paths;
  }
  // Gets the private object directory.
  getPrivateObjectDir() {
    const dir = process.env.PRIVATE_OBJECT_DIR || "";
    if (!dir) {
      throw new Error(
        "PRIVATE_OBJECT_DIR not set. Create a bucket in 'Object Storage' tool and set PRIVATE_OBJECT_DIR env var."
      );
    }
    return dir;
  }
  // Search for a public object from the search paths.
  async searchPublicObject(filePath) {
    for (const searchPath of this.getPublicObjectSearchPaths()) {
      const fullPath = `${searchPath}/${filePath}`;
      const { bucketName, objectName } = parseObjectPath(fullPath);
      const bucket = objectStorageClient.bucket(bucketName);
      const file = bucket.file(objectName);
      const [exists] = await file.exists();
      if (exists) {
        return file;
      }
    }
    return null;
  }
  // Downloads an object to the response.
  async downloadObject(file, res, cacheTtlSec = 3600) {
    try {
      const [metadata] = await file.getMetadata();
      const aclPolicy = await getObjectAclPolicy(file);
      const isPublic = aclPolicy?.visibility === "public";
      res.set({
        "Content-Type": metadata.contentType || "application/octet-stream",
        "Content-Length": metadata.size,
        "Cache-Control": `${isPublic ? "public" : "private"}, max-age=${cacheTtlSec}`
      });
      const stream = file.createReadStream();
      stream.on("error", (err) => {
        console.error("Stream error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Error streaming file" });
        }
      });
      stream.pipe(res);
    } catch (error) {
      console.error("Error downloading file:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error downloading file" });
      }
    }
  }
  // Gets the upload URL for an object entity.
  async getObjectEntityUploadURL() {
    const privateObjectDir = this.getPrivateObjectDir();
    if (!privateObjectDir) {
      throw new Error(
        "PRIVATE_OBJECT_DIR not set. Create a bucket in 'Object Storage' tool and set PRIVATE_OBJECT_DIR env var."
      );
    }
    const objectId = randomUUID();
    const fullPath = `${privateObjectDir}/uploads/${objectId}`;
    const { bucketName, objectName } = parseObjectPath(fullPath);
    return signObjectURL({
      bucketName,
      objectName,
      method: "PUT",
      ttlSec: 900
    });
  }
  // Gets the object entity file from the object path.
  async getObjectEntityFile(objectPath) {
    if (!objectPath.startsWith("/objects/")) {
      throw new ObjectNotFoundError();
    }
    const parts = objectPath.slice(1).split("/");
    if (parts.length < 2) {
      throw new ObjectNotFoundError();
    }
    const entityId = parts.slice(1).join("/");
    let entityDir = this.getPrivateObjectDir();
    if (!entityDir.endsWith("/")) {
      entityDir = `${entityDir}/`;
    }
    const objectEntityPath = `${entityDir}${entityId}`;
    const { bucketName, objectName } = parseObjectPath(objectEntityPath);
    const bucket = objectStorageClient.bucket(bucketName);
    const objectFile = bucket.file(objectName);
    const [exists] = await objectFile.exists();
    if (!exists) {
      throw new ObjectNotFoundError();
    }
    return objectFile;
  }
  normalizeObjectEntityPath(rawPath) {
    if (!rawPath.startsWith("https://storage.googleapis.com/")) {
      return rawPath;
    }
    const url = new URL(rawPath);
    const rawObjectPath = url.pathname;
    let objectEntityDir = this.getPrivateObjectDir();
    if (!objectEntityDir.endsWith("/")) {
      objectEntityDir = `${objectEntityDir}/`;
    }
    if (!rawObjectPath.startsWith(objectEntityDir)) {
      return rawObjectPath;
    }
    const entityId = rawObjectPath.slice(objectEntityDir.length);
    return `/objects/${entityId}`;
  }
  // Tries to set the ACL policy for the object entity and return the normalized path.
  async trySetObjectEntityAclPolicy(rawPath, aclPolicy) {
    const normalizedPath = this.normalizeObjectEntityPath(rawPath);
    if (!normalizedPath.startsWith("/")) {
      return normalizedPath;
    }
    const objectFile = await this.getObjectEntityFile(normalizedPath);
    await setObjectAclPolicy(objectFile, aclPolicy);
    return normalizedPath;
  }
  // Checks if the user can access the object entity.
  async canAccessObjectEntity({
    userId,
    objectFile,
    requestedPermission
  }) {
    return canAccessObject({
      userId,
      objectFile,
      requestedPermission: requestedPermission ?? "read" /* READ */
    });
  }
};
function parseObjectPath(path3) {
  if (!path3.startsWith("/")) {
    path3 = `/${path3}`;
  }
  const pathParts = path3.split("/");
  if (pathParts.length < 3) {
    throw new Error("Invalid path: must contain at least a bucket name");
  }
  const bucketName = pathParts[1];
  const objectName = pathParts.slice(2).join("/");
  return {
    bucketName,
    objectName
  };
}
async function signObjectURL({
  bucketName,
  objectName,
  method,
  ttlSec
}) {
  const request = {
    bucket_name: bucketName,
    object_name: objectName,
    method,
    expires_at: new Date(Date.now() + ttlSec * 1e3).toISOString()
  };
  const response = await fetch(
    `${REPLIT_SIDECAR_ENDPOINT}/object-storage/signed-object-url`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    }
  );
  if (!response.ok) {
    throw new Error(
      `Failed to sign object URL, errorcode: ${response.status}, make sure you're running on Replit`
    );
  }
  const { signed_url: signedURL } = await response.json();
  return signedURL;
}

// server/routes.ts
var PgSession = connectPgSimple(session);
var isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  return res.status(401).json({ success: false, message: "Unauthorized" });
};
async function registerRoutes(app2) {
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    const isDevelopment = process.env.NODE_ENV !== "production";
    if (isDevelopment) {
      console.warn("\u26A0\uFE0F  WARNING: SESSION_SECRET is not set. Using development-only fallback.");
      console.warn("\u26A0\uFE0F  Set SESSION_SECRET environment variable for production!");
    } else {
      throw new Error("SESSION_SECRET environment variable must be set in production!");
    }
  }
  app2.use(
    session({
      store: new PgSession({
        pool,
        tableName: "user_sessions",
        createTableIfMissing: true
      }),
      secret: sessionSecret || "dev-only-secret-change-in-production",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1e3,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax"
      }
    })
  );
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
      req.session.userId = user.id;
      req.session.username = user.username;
      res.json({
        success: true,
        user: { id: user.id, username: user.username }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: "Login failed" });
    }
  });
  app2.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Logout failed" });
      }
      res.json({ success: true, message: "Logged out successfully" });
    });
  });
  app2.get("/api/auth/session", (req, res) => {
    if (req.session.userId) {
      res.json({
        success: true,
        user: { id: req.session.userId, username: req.session.username }
      });
    } else {
      res.status(401).json({ success: false, message: "Not authenticated" });
    }
  });
  app2.post("/api/objects/upload", isAuthenticated, async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ error: "Failed to get upload URL" });
    }
  });
  app2.put("/api/blog-images", isAuthenticated, async (req, res) => {
    if (!req.body.imageURL) {
      return res.status(400).json({ error: "imageURL is required" });
    }
    const userId = req.session.userId;
    try {
      const objectStorageService = new ObjectStorageService();
      const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
        req.body.imageURL,
        {
          owner: userId,
          visibility: "public"
        }
      );
      const normalizedPath = objectPath.startsWith("/objects/") ? objectPath : `/objects${objectPath.startsWith("/") ? "" : "/"}${objectPath}`;
      res.status(200).json({
        objectPath: normalizedPath
      });
    } catch (error) {
      console.error("Error setting blog image:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app2.get("/objects/:objectPath(*)", async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(
        req.path
      );
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error checking object access:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.json({
        success: true,
        message: "Contact form submitted successfully",
        id: submission.id
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({
        success: false,
        message: "Invalid form data"
      });
    }
  });
  app2.get("/api/contact", isAuthenticated, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching submissions"
      });
    }
  });
  app2.post("/api/testimonials", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json({ success: true, data: testimonial });
    } catch (error) {
      console.error("Create testimonial error:", error);
      res.status(400).json({ success: false, message: "Invalid data" });
    }
  });
  app2.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials2 = await storage.getTestimonials();
      res.json(testimonials2);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ success: false, message: "Error fetching testimonials" });
    }
  });
  app2.get("/api/testimonials/:id", async (req, res) => {
    try {
      const testimonial = await storage.getTestimonial(req.params.id);
      if (!testimonial) {
        return res.status(404).json({ success: false, message: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error) {
      console.error("Error fetching testimonial:", error);
      res.status(500).json({ success: false, message: "Error fetching testimonial" });
    }
  });
  app2.put("/api/testimonials/:id", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.updateTestimonial(req.params.id, validatedData);
      res.json({ success: true, data: testimonial });
    } catch (error) {
      console.error("Update testimonial error:", error);
      res.status(400).json({ success: false, message: "Invalid data" });
    }
  });
  app2.delete("/api/testimonials/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteTestimonial(req.params.id);
      res.json({ success: true, message: "Testimonial deleted" });
    } catch (error) {
      console.error("Delete testimonial error:", error);
      res.status(500).json({ success: false, message: "Error deleting testimonial" });
    }
  });
  app2.post("/api/blogs", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertBlogSchema.parse(req.body);
      const blog = await storage.createBlog(validatedData);
      res.json({ success: true, data: blog });
    } catch (error) {
      console.error("Create blog error:", error);
      res.status(400).json({ success: false, message: "Invalid data" });
    }
  });
  function normalizeBlogImageUrl(imageUrl) {
    if (!imageUrl) return null;
    if (imageUrl.startsWith("/objects/")) {
      return imageUrl;
    }
    if (imageUrl.startsWith("/")) {
      return `/objects${imageUrl}`;
    }
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }
    return `/objects/${imageUrl}`;
  }
  app2.get("/api/blogs", async (req, res) => {
    try {
      const blogs2 = await storage.getBlogs();
      const normalizedBlogs = blogs2.map((blog) => ({
        ...blog,
        imageUrl: normalizeBlogImageUrl(blog.imageUrl)
      }));
      res.json(normalizedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ success: false, message: "Error fetching blogs" });
    }
  });
  app2.get("/api/blogs/:id", async (req, res) => {
    try {
      const blog = await storage.getBlog(req.params.id);
      if (!blog) {
        return res.status(404).json({ success: false, message: "Blog not found" });
      }
      const normalizedBlog = {
        ...blog,
        imageUrl: normalizeBlogImageUrl(blog.imageUrl)
      };
      res.json(normalizedBlog);
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).json({ success: false, message: "Error fetching blog" });
    }
  });
  app2.put("/api/blogs/:id", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertBlogSchema.parse(req.body);
      const blog = await storage.updateBlog(req.params.id, validatedData);
      res.json({ success: true, data: blog });
    } catch (error) {
      console.error("Update blog error:", error);
      res.status(400).json({ success: false, message: "Invalid data" });
    }
  });
  app2.delete("/api/blogs/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteBlog(req.params.id);
      res.json({ success: true, message: "Blog deleted" });
    } catch (error) {
      console.error("Delete blog error:", error);
      res.status(500).json({ success: false, message: "Error deleting blog" });
    }
  });
  app2.post("/api/admin/migrate-blog-images", isAuthenticated, async (req, res) => {
    try {
      const blogs2 = await storage.getBlogs();
      let updatedCount = 0;
      for (const blog of blogs2) {
        if (blog.imageUrl) {
          const normalizedUrl = normalizeBlogImageUrl(blog.imageUrl);
          if (normalizedUrl !== blog.imageUrl) {
            await storage.updateBlog(blog.id, {
              ...blog,
              imageUrl: normalizedUrl
            });
            updatedCount++;
          }
        }
      }
      res.json({
        success: true,
        message: `Migrated ${updatedCount} blog image URLs`,
        updatedCount
      });
    } catch (error) {
      console.error("Error migrating blog images:", error);
      res.status(500).json({ success: false, message: "Error migrating blog images" });
    }
  });
  app2.post("/api/packages", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertPackageSchema.parse(req.body);
      const pkg = await storage.createPackage(validatedData);
      res.json({ success: true, data: pkg });
    } catch (error) {
      console.error("Create package error:", error);
      res.status(400).json({ success: false, message: "Invalid data" });
    }
  });
  app2.get("/api/packages", async (req, res) => {
    try {
      const packages2 = await storage.getPackages();
      res.json(packages2);
    } catch (error) {
      console.error("Error fetching packages:", error);
      res.status(500).json({ success: false, message: "Error fetching packages" });
    }
  });
  app2.get("/api/packages/:id", async (req, res) => {
    try {
      const pkg = await storage.getPackage(req.params.id);
      if (!pkg) {
        return res.status(404).json({ success: false, message: "Package not found" });
      }
      res.json(pkg);
    } catch (error) {
      console.error("Error fetching package:", error);
      res.status(500).json({ success: false, message: "Error fetching package" });
    }
  });
  app2.put("/api/packages/:id", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertPackageSchema.parse(req.body);
      const pkg = await storage.updatePackage(req.params.id, validatedData);
      res.json({ success: true, data: pkg });
    } catch (error) {
      console.error("Update package error:", error);
      res.status(400).json({ success: false, message: "Invalid data" });
    }
  });
  app2.delete("/api/packages/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deletePackage(req.params.id);
      res.json({ success: true, message: "Package deleted" });
    } catch (error) {
      console.error("Delete package error:", error);
      res.status(500).json({ success: false, message: "Error deleting package" });
    }
  });
  app2.post("/api/mentoria-packages", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertMentoriaPackageSchema.parse(req.body);
      const pkg = await storage.createMentoriaPackage(validatedData);
      res.json({ success: true, data: pkg });
    } catch (error) {
      console.error("Create mentoria package error:", error);
      res.status(400).json({ success: false, message: "Invalid data" });
    }
  });
  app2.get("/api/mentoria-packages", async (req, res) => {
    try {
      const packages2 = await storage.getMentoriaPackages();
      res.json(packages2);
    } catch (error) {
      console.error("Error fetching mentoria packages:", error);
      res.status(500).json({ success: false, message: "Error fetching mentoria packages" });
    }
  });
  app2.get("/api/mentoria-packages/active", async (req, res) => {
    try {
      const packages2 = await storage.getActiveMentoriaPackages();
      res.json(packages2);
    } catch (error) {
      console.error("Error fetching active mentoria packages:", error);
      res.status(500).json({ success: false, message: "Error fetching mentoria packages" });
    }
  });
  app2.get("/api/mentoria-packages/:id", async (req, res) => {
    try {
      const pkg = await storage.getMentoriaPackage(req.params.id);
      if (!pkg) {
        return res.status(404).json({ success: false, message: "Mentoria package not found" });
      }
      res.json(pkg);
    } catch (error) {
      console.error("Error fetching mentoria package:", error);
      res.status(500).json({ success: false, message: "Error fetching mentoria package" });
    }
  });
  app2.put("/api/mentoria-packages/:id", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertMentoriaPackageSchema.parse(req.body);
      const pkg = await storage.updateMentoriaPackage(req.params.id, validatedData);
      res.json({ success: true, data: pkg });
    } catch (error) {
      console.error("Update mentoria package error:", error);
      res.status(400).json({ success: false, message: "Invalid data" });
    }
  });
  app2.delete("/api/mentoria-packages/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteMentoriaPackage(req.params.id);
      res.json({ success: true, message: "Mentoria package deleted" });
    } catch (error) {
      console.error("Delete mentoria package error:", error);
      res.status(500).json({ success: false, message: "Error deleting mentoria package" });
    }
  });
  app2.post("/api/payments", async (req, res) => {
    try {
      const validatedData = insertPaymentTrackingSchema.parse(req.body);
      const payment = await storage.createPaymentTracking(validatedData);
      res.json({ success: true, data: payment });
    } catch (error) {
      console.error("Create payment tracking error:", error);
      res.status(400).json({ success: false, message: "Invalid data" });
    }
  });
  app2.get("/api/payments", isAuthenticated, async (req, res) => {
    try {
      const payments = await storage.getPaymentTrackings();
      res.json(payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ success: false, message: "Error fetching payments" });
    }
  });
  app2.get("/api/payments/:id", isAuthenticated, async (req, res) => {
    try {
      const payment = await storage.getPaymentTracking(req.params.id);
      if (!payment) {
        return res.status(404).json({ success: false, message: "Payment not found" });
      }
      res.json(payment);
    } catch (error) {
      console.error("Error fetching payment:", error);
      res.status(500).json({ success: false, message: "Error fetching payment" });
    }
  });
  app2.put("/api/payments/:id", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertPaymentTrackingSchema.parse(req.body);
      const payment = await storage.updatePaymentTracking(req.params.id, validatedData);
      res.json({ success: true, data: payment });
    } catch (error) {
      console.error("Update payment error:", error);
      res.status(400).json({ success: false, message: "Invalid data" });
    }
  });
  app2.delete("/api/payments/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deletePaymentTracking(req.params.id);
      res.json({ success: true, message: "Payment deleted" });
    } catch (error) {
      console.error("Delete payment error:", error);
      res.status(500).json({ success: false, message: "Error deleting payment" });
    }
  });
  app2.post("/api/mentoria-payment/create-order", async (req, res) => {
    try {
      const { packageId, customerName, customerEmail, customerPhone } = req.body;
      if (!packageId || !customerName || !customerEmail || !customerPhone) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields"
        });
      }
      const pkg = await storage.getMentoriaPackage(packageId);
      if (!pkg) {
        return res.status(404).json({
          success: false,
          message: "Package not found"
        });
      }
      const Razorpay = (await import("razorpay")).default;
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
      });
      const options = {
        amount: pkg.price * 100,
        currency: "INR",
        receipt: `M${Date.now().toString().slice(-10)}${Math.random().toString(36).slice(-6)}`,
        notes: {
          packageId: pkg.id,
          packageName: pkg.name,
          category: pkg.category,
          customerName,
          customerEmail,
          customerPhone
        }
      };
      const order = await razorpay.orders.create(options);
      await storage.createRazorpayOrder({
        razorpayOrderId: order.id,
        packageId: pkg.id,
        packageName: pkg.name,
        amount: pkg.price,
        customerName,
        customerEmail,
        customerPhone,
        status: "created"
      });
      res.json({
        success: true,
        orderId: order.id,
        amount: pkg.price,
        currency: "INR",
        keyId: process.env.RAZORPAY_KEY_ID
      });
    } catch (error) {
      console.error("Create Razorpay order error:", error);
      res.status(500).json({
        success: false,
        message: "Error creating payment order"
      });
    }
  });
  app2.post("/api/mentoria-payment/verify", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({
          success: false,
          message: "Missing payment verification details"
        });
      }
      const storedOrder = await storage.getRazorpayOrderByOrderId(razorpay_order_id);
      if (!storedOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }
      const crypto = await import("crypto");
      const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
      shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const digest = shasum.digest("hex");
      if (digest === razorpay_signature) {
        await storage.updateRazorpayOrderStatus(razorpay_order_id, "paid");
        await storage.createPaymentTracking({
          razorpayOrderId: razorpay_order_id,
          name: storedOrder.customerName,
          email: storedOrder.customerEmail,
          phone: storedOrder.customerPhone,
          packageId: storedOrder.packageId,
          packageName: storedOrder.packageName,
          status: "success"
        });
        res.json({
          success: true,
          message: "Payment verified successfully",
          paymentId: razorpay_payment_id
        });
      } else {
        await storage.updateRazorpayOrderStatus(razorpay_order_id, "failed");
        res.status(400).json({
          success: false,
          message: "Payment verification failed"
        });
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      res.status(500).json({
        success: false,
        message: "Error verifying payment"
      });
    }
  });
  app2.post("/api/payment/create-order", (req, res) => {
    res.status(410).json({
      success: false,
      message: "Razorpay payment gateway deprecated for regular packages. Please use UPI payment system."
    });
  });
  app2.post("/api/payment/verify", (req, res) => {
    res.status(410).json({
      success: false,
      message: "Razorpay payment gateway deprecated for regular packages. Please use UPI payment system."
    });
  });
  app2.post("/api/payment/cancel", (req, res) => {
    res.status(410).json({
      success: false,
      message: "Razorpay payment gateway deprecated for regular packages. Please use UPI payment system."
    });
  });
  app2.post("/api/admin/seed-testimonial-photos", isAuthenticated, async (req, res) => {
    try {
      console.log("[SEED] Starting testimonial photo seeding...");
      const fs2 = await import("fs/promises");
      const path3 = await import("path");
      const imageAssignments = {
        // Women - using woman and diverse images
        "Anshu Aggarwal": "professional_woman_h_30c2f2ce.jpg",
        "Suneeta Sodhi": "professional_woman_h_53c5cc03.jpg",
        "Kavya Shaji": "professional_woman_h_5d9e4850.jpg",
        "Prajakta Keni": "professional_busines_e3c10e8c.jpg",
        "Rina Jani": "professional_busines_aeda39b1.jpg",
        "Archana Khosa": "professional_busines_b344a90e.jpg",
        "Sarah Johnson": "professional_busines_f0eb240d.jpg",
        "Neha Mehta": "professional_diverse_7512fa13.jpg",
        "Divya K": "professional_diverse_96d9bf99.jpg",
        "Suzanne": "professional_diverse_4c963be5.jpg",
        // Men - using man and diverse images
        "Barinder Bedi": "professional_man_hea_984d4343.jpg",
        "Amit": "professional_man_hea_ef85437d.jpg",
        "Saurabh Chandel": "professional_man_hea_3364bfac.jpg",
        "Thakur Singh": "professional_busines_bdbde26e.jpg",
        "Vijay Kumar": "professional_busines_ad85ad99.jpg",
        "Avichal": "professional_busines_dbb32723.jpg",
        "Mithra Suresh": "professional_diverse_ca85497e.jpg"
      };
      const testimonials2 = await storage.getTestimonials();
      console.log(`[SEED] Found ${testimonials2.length} testimonials to process`);
      const objectService = new ObjectStorageService();
      const privateDir = objectService.getPrivateObjectDir();
      console.log(`[SEED] Using private dir: ${privateDir}`);
      const { bucketName } = parseObjectPath(privateDir);
      console.log(`[SEED] Bucket name: ${bucketName}`);
      let updatedCount = 0;
      const errors = [];
      const bucket = objectStorageClient.bucket(bucketName);
      for (const testimonial of testimonials2) {
        const trimmedName = testimonial.name.trim();
        const imageFileName = imageAssignments[trimmedName];
        if (!imageFileName) {
          continue;
        }
        const deterministicFileName = `testimonial-${testimonial.id}.jpg`;
        const objectPath = `${privateDir}/${deterministicFileName}`;
        const { objectName } = parseObjectPath(objectPath);
        const expectedImageUrl = `/objects/${deterministicFileName}`;
        const file = bucket.file(objectName);
        console.log(`[SEED] Processing ${trimmedName}: object=${objectName}, url=${expectedImageUrl}`);
        if (testimonial.imageUrl === expectedImageUrl) {
          try {
            const [exists] = await file.exists();
            if (exists) {
              continue;
            }
          } catch (error) {
            const errorMsg = `Error checking object existence for ${trimmedName}: ${error instanceof Error ? error.message : String(error)}`;
            console.error(errorMsg);
            errors.push(errorMsg);
            continue;
          }
        }
        const stockImagePath = path3.join(process.cwd(), "attached_assets", "stock_images", imageFileName);
        try {
          try {
            await fs2.access(stockImagePath);
          } catch {
            const errorMsg = `Stock image not found for ${trimmedName}: ${imageFileName}`;
            console.error(errorMsg);
            errors.push(errorMsg);
            continue;
          }
          const imageBuffer = await fs2.readFile(stockImagePath);
          console.log(`[SEED] Read ${imageBuffer.length} bytes for ${trimmedName}`);
          let [exists] = await file.exists();
          console.log(`[SEED] Object exists for ${trimmedName}: ${exists}`);
          if (exists) {
            console.log(`[SEED] Deleting existing object for ${trimmedName} to force fresh upload...`);
            await file.delete();
          }
          console.log(`[SEED] Uploading image for ${trimmedName} to ${objectName}...`);
          await file.save(imageBuffer, {
            metadata: {
              contentType: "image/jpeg"
            }
          });
          console.log(`[SEED] Upload complete for ${trimmedName}`);
          console.log(`[SEED] Setting ACL to public for ${trimmedName}...`);
          await setObjectAclPolicy(file, {
            visibility: "public",
            owner: "system"
          });
          console.log(`[SEED] ACL set for ${trimmedName}`);
          [exists] = await file.exists();
          if (!exists) {
            throw new Error("Upload verification failed - object does not exist after save");
          }
          console.log(`[SEED] Updating testimonial ${trimmedName} with URL: ${expectedImageUrl}`);
          await storage.updateTestimonial(testimonial.id, {
            imageUrl: expectedImageUrl
          });
          updatedCount++;
          console.log(`[SEED] Successfully processed ${trimmedName} (${updatedCount} total)`);
        } catch (error) {
          const errorMsg = `Error processing image for ${trimmedName}: ${error instanceof Error ? error.message : String(error)}`;
          console.error(errorMsg);
          errors.push(errorMsg);
        }
      }
      console.log(`[SEED] Completed! Updated ${updatedCount} testimonials with ${errors.length} errors`);
      res.json({
        success: errors.length === 0,
        message: errors.length === 0 ? `Successfully added profile photos to ${updatedCount} testimonials` : `Added photos to ${updatedCount} testimonials with ${errors.length} errors`,
        updatedCount,
        errors: errors.length > 0 ? errors : void 0
      });
    } catch (error) {
      console.error("Seed testimonial photos error:", error);
      res.status(500).json({
        success: false,
        message: "Error seeding testimonial photos"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/init.ts
import bcrypt2 from "bcrypt";
async function initializeAdmin() {
  try {
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      console.error("\u26A0\uFE0F  SECURITY WARNING: ADMIN_PASSWORD environment variable is not set!");
      console.error("\u26A0\uFE0F  Admin user initialization skipped. Please set ADMIN_USERNAME and ADMIN_PASSWORD environment variables.");
      console.error("\u26A0\uFE0F  In production, never use default credentials!");
      return;
    }
    const existingAdmin = await storage.getUserByUsername(adminUsername);
    if (!existingAdmin) {
      const hashedPassword = await bcrypt2.hash(adminPassword, 10);
      await storage.createUser({
        username: adminUsername,
        password: hashedPassword
      });
      console.log(`\u2713 Admin user created with username: ${adminUsername}`);
      console.log("\u26A0\uFE0F  Make sure to change your admin credentials after first login!");
    } else {
      console.log("\u2713 Admin user already exists");
    }
  } catch (error) {
    console.error("Error initializing admin user:", error);
  }
}

// server/index.ts
var app = express2();
app.set("trust proxy", 1);
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  await initializeAdmin();
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
