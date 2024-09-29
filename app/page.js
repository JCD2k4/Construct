import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="flex flex-row">
      <div className="pr-[80px]">
        <h1 className="mt-[96px] text-8xl ml-[96px]">Construct</h1>
        <p className="text-[32px] ml-[100px] mt-[68px]">Create your own 3d models!</p>
        <button className="btn bg-[#0AADFF] hover:bg-blue-600 ml-[170px] mt-[100px] w-[250px] h-[100px] text-xl">Try It out Now</button>
      </div>
      <div className="flex flex-row bg-black h-[400px] w-[700px] border rounded-2xl mt-[130px]">
      </div>
    </div>
      
    </>
  );
}
