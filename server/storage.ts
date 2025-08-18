import { type User, type InsertUser, type Lead, type InsertLead, type AuditRequest, type InsertAuditRequest } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLead(lead: InsertLead): Promise<Lead>;
  createAuditRequest(audit: InsertAuditRequest): Promise<AuditRequest>;
  getLeads(): Promise<Lead[]>;
  getAuditRequests(): Promise<AuditRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private auditRequests: Map<string, AuditRequest>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.auditRequests = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = { 
      ...insertLead, 
      id, 
      createdAt: new Date() 
    };
    this.leads.set(id, lead);
    return lead;
  }

  async createAuditRequest(insertAudit: InsertAuditRequest): Promise<AuditRequest> {
    const id = randomUUID();
    const audit: AuditRequest = { 
      ...insertAudit, 
      id, 
      createdAt: new Date() 
    };
    this.auditRequests.set(id, audit);
    return audit;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async getAuditRequests(): Promise<AuditRequest[]> {
    return Array.from(this.auditRequests.values());
  }
}

export const storage = new MemStorage();
