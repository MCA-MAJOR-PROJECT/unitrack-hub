import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import { Button } from "@/components/ui/button";
import {
  Award, Download, ExternalLink, Share2, Shield, Filter
} from "lucide-react";

const categories = ["All", "Academic", "Volunteering", "Research", "Events"];

const certificates = [
  { title: "Blockchain Fundamentals", category: "Academic", issuer: "Dr. Arun Kumar", date: "Jan 15, 2025", txHash: "0x7a2f...3b1c", txFull: "0x7a2f8e4d1b3c9a6f2e5d8c7b4a1f3b1c" },
  { title: "Campus Green Initiative", category: "Volunteering", issuer: "Prof. Meena Rao", date: "Jan 28, 2025", txHash: "0x9c1e...7d4f", txFull: "0x9c1e3a5b7d2f4e6c8a0b1d3f5e7d4f" },
  { title: "AI Research Assistant", category: "Research", issuer: "Dr. Priya Nair", date: "Feb 2, 2025", txHash: "0x4b8d...2a9e", txFull: "0x4b8d6f3a1c7e9b2d4f0a8c5e7b2a9e" },
  { title: "Tech Fest Coordinator", category: "Events", issuer: "Event Committee", date: "Feb 8, 2025", txHash: "0x6f3a...1c8b", txFull: "0x6f3a2d4b8c1e7f9a3b5d0f2e4a1c8b" },
  { title: "Peer Tutoring — DSA", category: "Volunteering", issuer: "Dr. Kumar", date: "Feb 10, 2025", txHash: "0x2e5a...9f3c", txFull: "0x2e5a7b1d3f8c4e6a0b2d5f7a9c9f3c" },
  { title: "Machine Learning Workshop", category: "Academic", issuer: "AI Lab", date: "Feb 12, 2025", txHash: "0x8d1b...5e7a", txFull: "0x8d1b3c5e7a9f2d4b6c8a0e1f3b5e7a" },
];

const categoryColors: Record<string, string> = {
  Academic: "from-neon-purple to-neon-blue",
  Volunteering: "from-emerald-500 to-cyan-500",
  Research: "from-amber-500 to-orange-500",
  Events: "from-neon-blue to-neon-cyan",
};

const categoryBadge: Record<string, string> = {
  Academic: "bg-primary/10 text-primary border-primary/30",
  Volunteering: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Research: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Events: "bg-neon-blue/10 text-neon-blue border-neon-blue/30",
};

const CertificateWallet = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? certificates
    : certificates.filter(c => c.category === activeCategory);

  return (
    <DashboardLayout role="student" userName="Alex">
      <div className="max-w-6xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">🪪 Certificate Wallet</h1>
            <p className="text-sm text-muted-foreground mt-1">Your blockchain-verified Web3 credentials</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Shield className="w-4 h-4 text-neon-cyan" />
            <span className="text-neon-cyan font-medium">Network: Connected ✔</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-all ${
                activeCategory === cat
                  ? "bg-primary/15 text-primary border-primary/40 neon-glow"
                  : "bg-secondary/40 text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((cert, i) => (
            <GlassCard key={i} className="!p-0 overflow-hidden group hover:neon-glow relative">
              {/* Top gradient bar */}
              <div className={`h-1.5 bg-gradient-to-r ${categoryColors[cert.category]}`} />

              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${categoryBadge[cert.category]}`}>
                    {cert.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-foreground mb-1">{cert.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{cert.issuer} · {cert.date}</p>

                {/* Blockchain Info */}
                <div className="p-2.5 rounded-lg bg-secondary/40 mb-4">
                  <p className="text-[10px] text-muted-foreground mb-1">Blockchain Tx ID</p>
                  <p className="text-xs font-mono text-neon-cyan">{cert.txHash}</p>
                </div>

                <BlockchainBadge status="verified" className="!text-[9px] mb-4" />

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <Button variant="neon" size="sm" className="flex-1 h-8 text-xs">
                    <ExternalLink className="w-3 h-3" /> Verify
                  </Button>
                  <Button variant="neon-outline" size="sm" className="h-8 text-xs px-2">
                    <Download className="w-3 h-3" />
                  </Button>
                  <Button variant="neon-outline" size="sm" className="h-8 text-xs px-2">
                    <Share2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CertificateWallet;
