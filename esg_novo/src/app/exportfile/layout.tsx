import Header from "@/components/Header_short";

function ExportCsv({ children }: { children: React.ReactNode }) {
 return (

  <main className="bg-[url('https://res.cloudinary.com/diz14smvb/image/upload/v1697222289/eco-friendly-city-illustration_35669-144_mjnb8f.jpg')] bg-no-repeat bg-cover ">
   <Header />
   <div className="flex min-h-screen flex-col items-center justify-center">
    <form className='flex flex-col bg-lime-200 shadow-2xl px-6 py-5 rounded-2xl gap-10 text-gray-600'>
     {children}
    </form>
   </div>
  </main>
 );
}

export default ExportCsv;