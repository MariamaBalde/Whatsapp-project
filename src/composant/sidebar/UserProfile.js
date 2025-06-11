export function createUserProfile() {
  const profile = document.createElement("div");
  profile.className =
    "h-[60px] bg-[#202c33] flex items-center px-4 justify-between";

  profile.innerHTML = `
        <div class="flex items-center">
            <h1 class="text-[#d8dadf] font-bold text-2xl">Discussions</h1>
        </div>
        <div class="flex  items-center space-x-3 text-[#aebac1]">
            <button class="py-2 px-3 hover:bg-[#374045] rounded-full">
            <i class="fa-regular fa-square-plus text-[25px]" style="color: #d8dadf;"></i>
            </button>
           
            <button class="p-2 hover:bg-[#374045] rounded-full">
               <i class="fa-solid fa-ellipsis-vertical  text-[25px]" style="color: #d8dadf;"></i>
            </button>
        </div>
    `;

  return profile;
}
