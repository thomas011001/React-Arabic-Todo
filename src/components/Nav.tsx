import { TabsList, TabsTrigger } from "@/components/ui/tabs";
type Tab = "all" | "done" | "undone";

function Nav({ handleChanginTabs }: { handleChanginTabs: (tab: Tab) => void }) {
  return (
    <TabsList className="rounded">
      <TabsTrigger
        className="rounded"
        value="undone"
        onClick={() => handleChanginTabs("undone")}
      >
        غير منجز
      </TabsTrigger>
      <TabsTrigger
        className="rounded"
        value="done"
        onClick={() => handleChanginTabs("done")}
      >
        منجز
      </TabsTrigger>
      <TabsTrigger
        className="rounded"
        value="all"
        onClick={() => handleChanginTabs("all")}
      >
        الكل
      </TabsTrigger>
    </TabsList>
  );
}

export default Nav;
