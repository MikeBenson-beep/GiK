import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, TrendingUp, DollarSign, Briefcase, Pencil } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Asset {
  name: string;
  amount: number;
  price: number;
}

// Props for the PortfolioManager component
interface PortfolioManagerProps {
  initialAssets?: Asset[];
  onUpdate: (assets: Asset[]) => void;
}

export function PortfolioManager({ initialAssets = [], onUpdate }: PortfolioManagerProps) {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newAsset, setNewAsset] = useState({ name: '', amount: '', price: '' });
  const { toast } = useToast();

  useEffect(() => {
    setAssets(initialAssets);
  }, [initialAssets]);

  const totalValue = assets.reduce((sum, asset) => sum + asset.amount * asset.price, 0);

  const handleAddAsset = () => {
    if (!newAsset.name || !newAsset.amount || !newAsset.price) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const asset = {
      name: newAsset.name,
      amount: parseFloat(newAsset.amount),
      price: parseFloat(newAsset.price),
    };

    const updatedAssets = [...assets, asset];
    setAssets(updatedAssets);
    onUpdate(updatedAssets);
    setNewAsset({ name: '', amount: '', price: '' });
    setIsAdding(false);
    
    toast({
      title: "Asset Added",
      description: "Your portfolio has been updated",
    });
  };

  const handleEditAsset = (asset: Asset) => {
    setEditingId(asset.id);
    setNewAsset({
      name: asset.name,
      amount: asset.amount.toString(),
      price: asset.price.toString(),
    });
    setIsAdding(true);
  };

  const handleUpdateAsset = () => {
    if (!editingId) return;

    const updatedAssets = assets.map(asset => 
      asset.id === editingId
        ? {
            ...asset,
            name: newAsset.name,
            amount: parseFloat(newAsset.amount),
            price: parseFloat(newAsset.price),
          }
        : asset
    );

    setAssets(updatedAssets);
    onUpdate(updatedAssets);
    setEditingId(null);
    setNewAsset({ name: '', amount: '', price: '' });
    setIsAdding(false);

    toast({
      title: "Asset Updated",
      description: "Your portfolio has been updated",
    });
  };

  const handleRemoveAsset = (id: string) => {
    const updatedAssets = assets.filter(asset => asset.id !== id);
    setAssets(updatedAssets);
    onUpdate(updatedAssets);
    toast({
      title: "Asset Removed",
      description: "The asset has been removed from your portfolio",
    });
  };

  return (
    <div className="space-y-12">
      {/* Portfolio Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black border-white/5 hover:border-white/10 transition-all duration-500 group">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/60 tracking-wider uppercase group-hover:text-white/80 transition-colors duration-300">Total Assets</p>
                <p className="text-3xl font-bold text-white mt-1 tracking-tight group-hover:scale-105 transition-transform duration-300">{assets.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-white/20 group-hover:text-white/40 group-hover:scale-110 transition-all duration-300" />
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black border-white/5 hover:border-white/10 transition-all duration-500 group">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/60 tracking-wider uppercase group-hover:text-white/80 transition-colors duration-300">Portfolio Value</p>
                <p className="text-3xl font-bold text-white mt-1 tracking-tight group-hover:scale-105 transition-transform duration-300">${totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-white/20 group-hover:text-white/40 group-hover:scale-110 transition-all duration-300" />
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black border-white/5 hover:border-white/10 transition-all duration-500 group">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/60 tracking-wider uppercase group-hover:text-white/80 transition-colors duration-300">Daily Change</p>
                <p className="text-3xl font-bold text-emerald-400 mt-1 tracking-tight group-hover:scale-105 transition-transform duration-300">+2.4%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-400/20 group-hover:text-emerald-400/40 group-hover:scale-110 transition-all duration-300" />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Add/Edit Asset Button */}
      {!isAdding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center"
        >
          <Button
            onClick={() => setIsAdding(true)}
            className="group relative px-6 py-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all duration-300"
          >
            <span className="flex items-center">
              <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
              Add Asset
            </span>
          </Button>
        </motion.div>
      )}

      {/* Add/Edit Asset Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-6 bg-gradient-to-br from-zinc-900 to-black border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-white tracking-wide">
                  {editingId ? 'Edit Asset' : 'Add New Asset'}
                </h3>
                <Button
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setNewAsset({ name: '', amount: '', price: '' });
                  }}
                  variant="ghost"
                  className="text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Asset Name"
                  value={newAsset.name}
                  onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
                <Input
                  type="number"
                  placeholder="Amount"
                  value={newAsset.amount}
                  onChange={(e) => setNewAsset({ ...newAsset, amount: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
                <Input
                  type="number"
                  placeholder="Price per unit"
                  value={newAsset.price}
                  onChange={(e) => setNewAsset({ ...newAsset, price: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <Button
                onClick={editingId ? handleUpdateAsset : handleAddAsset}
                className="mt-6 w-full bg-white/5 hover:bg-white/10 text-white transition-all duration-300"
              >
                {editingId ? 'Update Asset' : 'Add to Portfolio'}
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Assets Table */}
      {assets.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative rounded-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black opacity-50" />
          <Table className="relative">
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-white/5">
                <TableHead className="text-white/60">Asset</TableHead>
                <TableHead className="text-white/60 text-right">Amount</TableHead>
                <TableHead className="text-white/60 text-right">Price</TableHead>
                <TableHead className="text-white/60 text-right">Value</TableHead>
                <TableHead className="text-white/60 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {assets.map((asset) => (
                  <TableRow
                    key={asset.id}
                    className="border-white/5 hover:bg-white/5 transition-colors duration-200"
                  >
                    <TableCell className="font-medium text-white">{asset.name}</TableCell>
                    <TableCell className="text-white/80 text-right">{asset.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-white/80 text-right">${asset.price}</TableCell>
                    <TableCell className="text-white font-medium text-right">
                      ${(asset.amount * asset.price).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => handleEditAsset(asset)}
                          variant="ghost"
                          className="text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleRemoveAsset(asset.id)}
                          variant="ghost"
                          className="text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </motion.div>
      )}
    </div>
  );
}