
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import ItemList from "@/components/ItemList";
import CreateEditDialog from "@/components/CreateEditDialog";
import { Item } from "@/types/item";

const Index = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = (newItem: Item) => {
    setItems([...items, { ...newItem, id: crypto.randomUUID() }]);
  };

  const handleUpdate = (updatedItem: Item) => {
    setItems(items.map((item) => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Items</h1>
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                className="pl-10 w-full"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2" size={20} />
              Add Item
            </Button>
          </div>
        </div>

        <ItemList 
          items={filteredItems}
          onEdit={setEditingItem}
          onDelete={handleDelete}
        />

        <CreateEditDialog
          open={isCreateDialogOpen || !!editingItem}
          onOpenChange={(open) => {
            setIsCreateDialogOpen(open);
            if (!open) setEditingItem(null);
          }}
          item={editingItem}
          onSubmit={(item) => {
            if (editingItem) {
              handleUpdate(item);
            } else {
              handleCreate(item);
            }
            setIsCreateDialogOpen(false);
            setEditingItem(null);
          }}
        />
      </div>
    </div>
  );
};

export default Index;
