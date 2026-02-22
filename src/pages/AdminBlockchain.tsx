import DashboardLayout from "@/components/DashboardLayout";
import GlassCard from "@/components/GlassCard";
import BlockchainBadge from "@/components/BlockchainBadge";
import StatCard from "@/components/StatCard";
import { Shield, Activity, Cpu, Database, Search, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const transactions = [
  { hash: "0x7a2f8c1d3b4e...3b1c", type: "Credit Issue", from: "Smart Contract", to: "Alex Johnson", amount: "5 credits", time: "2 min ago", status: "verified" as const, block: "#18,432" },
  { hash: "0x9c1e4b7d2a8f...7d4f", type: "Certificate Mint", from: "Admin", to: "Priya Sharma", amount: "NFT #0042", time: "15 min ago", status: "verified" as const, block: "#18,430" },
  { hash: "0x4b8d6f2a9c1e...2a9e", type: "Activity Create", from: "Dr. Kumar", to: "Contract", amount: "—", time: "1h ago", status: "pending" as const, block: "#18,428" },
  { hash: "0x6f3a1c8b4d2e...1c8b", type: "Credit Issue", from: "Smart Contract", to: "Rahul Verma", amount: "3 credits", time: "3h ago", status: "verified" as const, block: "#18,425" },
  { hash: "0x2e5b9a3f7c1d...5b9a", type: "Certificate Mint", from: "Admin", to: "Vikram Patel", amount: "NFT #0041", time: "5h ago", status: "verified" as const, block: "#18,420" },
  { hash: "0x8d4f1a6c3b2e...4f1a", type: "Wallet Link", from: "Anita Desai", to: "DID Registry", amount: "—", time: "8h ago", status: "verified" as const, block: "#18,415" },
  { hash: "0x3c7e2b5a9d1f...7e2b", type: "Credit Issue", from: "Smart Contract", to: "Student Pool", amount: "12 credits", time: "12h ago", status: "verified" as const, block: "#18,410" },
];

const contracts = [
  { name: "CreditManager.sol", address: "0x742d...F8b3", status: "Active", txCount: 1247 },
  { name: "CertificateNFT.sol", address: "0x8a1c...D4e7", status: "Active", txCount: 89 },
  { name: "DIDRegistry.sol", address: "0x3f5e...A2c9", status: "Active", txCount: 342 },
];

const AdminBlockchain = () => {
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((tx) =>
    tx.type.toLowerCase().includes(search.toLowerCase()) ||
    tx.to.toLowerCase().includes(search.toLowerCase()) ||
    tx.hash.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="admin" userName="Admin">
      <div className="space-y-6 max-w-7xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Blockchain Explorer</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor on-chain transactions, smart contracts & network health</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Transactions" value="3,241" icon={Activity} trend="150 today" trendUp />
          <StatCard label="Smart Contracts" value="3" icon={Cpu} trend="All active" trendUp />
          <StatCard label="Certificates Minted" value="89" icon={Shield} trend="12 this week" trendUp />
          <StatCard label="Block Height" value="#18,432" icon={Database} trend="Synced" trendUp />
        </div>

        {/* Smart Contracts */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Deployed Smart Contracts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {contracts.map((c, i) => (
              <GlassCard key={i} className="!p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan">{c.status}</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{c.name}</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">{c.address}</p>
                <p className="text-xs text-muted-foreground mt-2">{c.txCount.toLocaleString()} transactions</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Transaction Log */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Transaction Log</h3>
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          <GlassCard className="!p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {["Tx Hash", "Type", "From", "To", "Amount", "Block", "Time", "Status"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((tx, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-mono text-primary">{tx.hash}</span>
                          <Button variant="ghost" size="icon" className="h-5 w-5"><Copy className="w-3 h-3" /></Button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">{tx.type}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{tx.from}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{tx.to}</td>
                      <td className="px-4 py-3 text-xs font-medium text-foreground">{tx.amount}</td>
                      <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{tx.block}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{tx.time}</td>
                      <td className="px-4 py-3"><BlockchainBadge status={tx.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminBlockchain;
