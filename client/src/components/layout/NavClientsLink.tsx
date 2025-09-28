import { Link } from "wouter";
import { Users } from "lucide-react";

export default function NavClientsLink() {
  return (
    <Link href="/clients">
      <a className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-electric-blue/10 to-neon-cyan/10 border border-electric-blue/20 rounded-xl text-electric-blue font-semibold hover:from-electric-blue/20 hover:to-neon-cyan/20 hover:border-electric-blue/30 transition-all duration-300 transform hover:scale-105">
        <Users className="w-4 h-4 mr-2" />
        Clients
      </a>
    </Link>
  );
}