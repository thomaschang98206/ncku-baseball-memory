import AdminGate from "../../../components/AdminGate";
import AdminNav from "../../../components/AdminNav";
import AdminSettingsForm from "../../../components/AdminSettingsForm";

export default function AdminSettingsPage() {
  return (
    <AdminGate>
      <main className="min-h-screen bg-[#F4E8D9] text-[#421211]">
        <AdminNav />
        <section className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#A8222B]">
              Control Panel
            </p>
            <h1 className="mt-3 text-3xl font-black md:text-5xl">
              網站內容設定
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#7A665B]">
              修改後回首頁重新整理，即可看到資料庫的新內容。
            </p>
          </div>
          <AdminSettingsForm />
        </section>
      </main>
    </AdminGate>
  );
}
