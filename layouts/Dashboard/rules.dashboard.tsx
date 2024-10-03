const data = [
    "Gunakan layanan ini dengan bijak dan tidak melakukan tindakan yang dapat merugikan orang lain atau merusak sistem.",
    "Jangan melakukan permintaan yang berlebihan (flooding), karena hal ini dapat mengganggu performa layanan dan merugikan pengguna lain.",
    "Jaga kerahasiaan akun dan API key Anda. Jika ditemukan penyalahgunaan, akun Anda mungkin akan diblokir secara permanen.",
    "Owner berhak mengubah ketentuan penggunaan tanpa pemberitahuan sebelumnya demi menjaga kualitas layanan.",
    "Jangan mencoba untuk mengakses atau memanfaatkan data atau layanan yang bukan hak Anda.",
    "Owner tidak bertanggung jawab atas segala tindakan yang Anda lakukan dengan menggunakan layanan ini.",
    "Layanan ini disediakan secara gratis. Harap gunakan dengan adil dan tidak mencoba memanipulasi sistem."
];

export default function RulesDashboard() {
    return (
        <div className="background rounded-xl w-full p-4 border border-a">
            <div className="text-2xl mb-2">S&K</div>
            <ol className="list-decimal px-8">
                {data.map((item, index) => (
                    <li key={index} className="font-normal text-sm">{item}</li>
                ))}
            </ol>
        </div>
    );
}
