import { sideMenu } from "./data/sideMenu.config";
import SidebarItem from "./sideBarItem";

const Sidebar = () => {
  return (
    <aside
      id="sidebar"
      className="fixed left-0 z-20 pt-1 pb-32 flex-col flex-shrink-0 hidden w-64 h-full font-normal duration-75 lg:flex transition-width bg-white"
    >
      <div className="px-3 py-4 overflow-y-auto rounded bg-white h-screen">
        <ul className="space-y-2">
          {sideMenu.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 border-t border-gray-200  justify-center items-center  w-full h-28 pb-16 space-x-4 bg-white lg:flex dark:bg-gray-800 sidebar-bottom-menu">
        <div className="text-[#0284c7] text-xs">CloudPOS^ by SKIP</div>
      </div>
    </aside>
  );
};

export default Sidebar;
