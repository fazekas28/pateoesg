import Header from "@/components/Header_short";

function MtrInfoPage({ children }: { children: React.ReactNode }) {
 return (
  <main>
   <Header />
   <div className='flex justify-center'>
    {children}
   </div>
  </main>
 );
}

export default MtrInfoPage;