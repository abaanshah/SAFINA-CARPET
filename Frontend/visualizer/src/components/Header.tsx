import { Crown } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-[#860A0C] shadow-premium border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg shadow-glow">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Safina Carpets
            </h1>
            <p className="text-white/80 text-sm">
              Premium Rug Visualizer
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;