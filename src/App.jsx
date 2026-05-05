import { useState, useEffect, useRef } from "react";
import {
  Building2,
  MapPin,
  Users,
  Clock,
  Send,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  Calendar
} from "lucide-react";
import "./App.css";
import { kloterList } from "./kloterData";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzVtlA6E1IychGjtKAuAAU7dU4NHE_i6rieV9CQdxhVnSsl4cX0wB8t2o74f9PPikK9/exec";

const hotelBySektor = {
  "Sektor 1": [
    { "id": "101", "name": "ARTAL INTERNATIONAL HOTEL" },
    { "id": "102", "name": "RUA INTERNATIONAL HOTEL" },
    { "id": "103", "name": "SAFWAT ALMADINA HOTEL" },
    { "id": "104", "name": "SANABEL AL MADINA HOTEL" },
    { "id": "105", "name": "GRAND PLAZA BADR AL MAQAM" },
    { "id": "106", "name": "GRAND PLAZA ALMADINAH" },
    { "id": "107", "name": "DAR AL EIMAN AL HARAM/THE HOUSE OF FAITH" },
    { "id": "108", "name": "GOLDEN TULIP AL ZAHABI HOTEL" },
    { "id": "109", "name": "TAIBAH HOTEL DALLAH " },
    { "id": "110", "name": "SOFITEL SHAHD ALMADINAH" },
    { "id": "111", "name": "ANDALUS CLASSY SUITES" },
    { "id": "112", "name": "MADINAH HILTON" },
    { "id": "113", "name": "MAKAREM BURJ ALMADINAH HOTEL" },
    { "id": "114", "name": "MAKAREM HARAM VIEW SUITES MADINAH" },
    { "id": "115", "name": "TAIBA FRONT HOTEL" },
    { "id": "116", "name": "MILLENNIUM AL AQEEQ HOTEL" },
    { "id": "117", "name": "AL RITZ AL MADINA HOTEL " },
    { "id": "118", "name": "DAR ALHIJRA INTERCONTINENTAL" },
    { "id": "119", "name": "CON CODE ALNAZEEL" },
    { "id": "120", "name": "SHAZA REGENCY PLAZA HOTEL" },
    { "id": "121", "name": "AL ANSAR GOLDEN TULIP" },
    { "id": "122", "name": "AL ANSAR NEW PALACE HOTEL" }
  ],
  "Sektor 2": [
    { "id": "201", "name": "DAR AL IMAN INTERCONTINENTAL" },
    { "id": "202", "name": "MAYSAN ALHARITHIA HOTEL" },
    { "id": "203", "name": "AL ANSAR PLATINUM HOTEL" },
    { "id": "204", "name": "ZOWAR INTERNATIONAL HOTEL" },
    { "id": "205", "name": "ODST AL MADINAH HOTEL" },
    { "id": "206", "name": "AL ANDALUS GOLDEN PALACE HOTEL" },
    { "id": "207", "name": "SAJA AL MADINAH HOTEL" },
    { "id": "208", "name": "ALHAYATT INTERNATIONAL HOTEL" },
    { "id": "209", "name": "WAQF OUTHMAN BIN AFFAN HOTEL" },
    { "id": "210", "name": "ALMOKHTARA INTERNATIONAL HOTEL" },
    { "id": "211", "name": "DURRAT AL EIMAN HOTEL" },
    { "id": "212", "name": "TRIPLE ONE HOTEL" },
    { "id": "213", "name": "ROYA AL MADINA HOTEL" },
    { "id": "214", "name": "ARKAN AL MANAR HOTEL" },
    { "id": "215", "name": "DIYAR AL EIMAN HOTEL" },
    { "id": "216", "name": "ABRAJ TABAH HOTEL" },
    { "id": "217", "name": "CONCORDE DAR AL KHAIR" },
    { "id": "218", "name": "ELAF TAIBA HOTEL" },
    { "id": "219", "name": "KARAM AL-HEJAZ HOTEL" },
    { "id": "220", "name": "KARAM TAIBA ALMASI HOTEL" },
    { "id": "221", "name": "RUA ALSAADAH" },
    { "id": "222", "name": "RABWAT ALSAFWA GOLDEN" },
    { "id": "223", "name": "GOLDEN ERGWAN HOTEL" }
  ],
  "Sektor 3": [
    { "id": "301", "name": "MANAZEL ALHASAN HOTEL" },
    { "id": "302", "name": "TABA ALSALAM" },
    { "id": "303", "name": "RIYADH AL-ZAHRA HOTEL" },
    { "id": "304", "name": "KARAM AL KHAIR HOTEL" },
    { "id": "305", "name": "RAWDA AL AQIQ HOTEL" },
    { "id": "306", "name": "HAYAH ALHUDA HOTEL" },
    { "id": "307", "name": "GRAND ZOWAR HOTEL" },
    { "id": "308", "name": "ARJWAN ALSAADA HOTEL" },
    { "id": "309", "name": "WEFADAH AL ZAHRA HOTEL" },
    { "id": "310", "name": "AMJAD ALSALAM HOTEL" },
    { "id": "311", "name": "MANAZIL ALRAHMA HOTEL" },
    { "id": "312", "name": "RAWABI AL ZAHRA HOTEL" },
    { "id": "313", "name": "MIRAGE ALSALAM HOTEL" },
    { "id": "314", "name": "Manazil Al Falah Golden" },
    { "id": "315", "name": "Wardat Alrayan" },
    { "id": "316", "name": "ALMOKHTARA DIAMOND HOTEL" },
    { "id": "317", "name": "ROSE HOLIDAY" },
    { "id": "318", "name": "EMAAR TAIBA HOTEL" },
    { "id": "319", "name": "ALBARAKA KARIM HOTEL TOURISM HOSPITALITY COMPANY" },
    { "id": "320", "name": "PLAZA INN OHUD HOTEL" },
    { "id": "321", "name": "ASSAAFA GOLDEN HOTEL" },
    { "id": "322", "name": "DIYAR AL HUDA HOTEL" },
    { "id": "323", "name": "SEBAL PLUS HOTEL" },
    { "id": "324", "name": "DIWAN ROSE" },
    { "id": "325", "name": "Karam Elite" }
  ],
  "Sektor 4": [
    { "id": "401", "name": "AL ANDALUS DAR ALSALAM HOTEL" },
    { "id": "402", "name": "TAQWA MANAZEL HOTEL" },
    { "id": "403", "name": "WARDAT ALSAADAH HOTEL" },
    { "id": "404", "name": "RUA AL DHIYAFA HOTEL" },
    { "id": "405", "name": "RUA GRAND HOTEL" },
    { "id": "406", "name": "AL MOKHTARA GOLDEN HOTEL " },
    { "id": "407", "name": "JAWHARAT ALRASHEED HOTEL" },
    { "id": "408", "name": "HOTEL ALMARJAN INTERNATIONAL TOWER" },
    { "id": "409", "name": "DIYAR AL NAKHEEL HOTEL" },
    { "id": "410", "name": "ARJWAN ROSE HOTEL" },
    { "id": "411", "name": "SEDRT AL MADINAH HOTEL" },
    { "id": "412", "name": "LOULOAT ALDIYAFAH HOTEL" },
    { "id": "413", "name": "KAYAN AL MADINAH HOTEL" },
    { "id": "414", "name": "ARGUAN ALSALAM HOTEL" },
    { "id": "415", "name": "AS'SAAFA HOTEL" },
    { "id": "416", "name": "AL MADINAH ERGWAN HOTEL" },
    { "id": "417", "name": "Ruya Alandalus" },
    { "id": "418", "name": "HOTEL KARAM ALMADINA" },
    { "id": "419", "name": "MILLENNIUM TAIBA HOTEL" },
    { "id": "420", "name": "GRAND ALSHAHBA" },
    { "id": "421", "name": "AL MANAKHA ROTANA HOTEL" },
    { "id": "422", "name": "DIYAR AL MADINA HOTEL" },
    { "id": "423", "name": "REHAB HARMONY" },
    { "id": "424", "name": "ROWDAH AL MUKHTARAH HOTEL" },
    { "id": "425", "name": "TAIBA ROSE HOTEL" },
    { "id": "426", "name": "AL AMAN AL ARABIA" }
  ],
  "Sektor 5": [
    { "id": "501", "name": "RUA TAIBA HOTEL" },
    { "id": "502", "name": "JAWAR TAIBAH HOTEL" },
    { "id": "503", "name": "ELAF AL TAQWA HOTEL" },
    { "id": "504", "name": "BARA TAIBA HOTEL" },
    { "id": "505", "name": "HUDA TAIBAH HOTEL" },
    { "id": "506", "name": "HOTEL MANAR ALEIMAN" },
    { "id": "507", "name": "JIWAR AL-MADINA" },
    { "id": "508", "name": "NUSUK ALHIJRA HOTEL" },
    { "id": "509", "name": "ROAYA ALANDALUS PLATINI HOTEL" },
    { "id": "510", "name": "GULNAR THAIBAH" },
    { "id": "511", "name": "DIYAR TAIBAH HOTEL" },
    { "id": "512", "name": "DIYAR AL HABIB HOTEL" },
    { "id": "513", "name": "AL-ANDALUS ALMASI HOTEL" },
    { "id": "514", "name": "MIRAGE TAIBA HOTEL" },
    { "id": "515", "name": "DIWAN AL HIJRA HOTEL" },
    { "id": "516", "name": "RUA ALMASI HOTEL" },
    { "id": "517", "name": "JAYDEN HOTEL" },
    { "id": "518", "name": "MAYSAN ALTAQWA HOTEL" },
    { "id": "519", "name": "3 POINTS AL-AMEIN" },
    { "id": "520", "name": "HOTEL NIQAT THALATHA AL-RIDA" },
    { "id": "521", "name": "3 POINTA AL-KAWTHAR" },
    { "id": "522", "name": "TAJ WARD HOTEL" },
    { "id": "523", "name": "MANAZIL ALASWAF" },
    { "id": "524", "name": "MANAZIL MADINAH" },
    { "id": "525", "name": "Rose Holiday 3" }
  ]
};

function App() {
  const [formData, setFormData] = useState({
    jenisFormulir: "",
    sektor: "",
    hotel: "",
    kloter: "",
    jumlahJamaah: "",
    tanggal: "",
    jam: ""
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
  const [kloterSearch, setKloterSearch] = useState("");
  const [showKloterDropdown, setShowKloterDropdown] = useState(false);
  const kloterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (kloterRef.current && !kloterRef.current.contains(event.target)) {
        setShowKloterDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === 'sektor') {
        newData.hotel = ''; // Reset hotel when sektor changes
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { jenisFormulir, sektor, hotel, kloter, jumlahJamaah, tanggal, jam } = formData;

    if (!jenisFormulir || !sektor || !hotel || !kloter || !jumlahJamaah || !tanggal || !jam) {
      showToast("Mohon lengkapi semua data form.", "error");
      return;
    }

    try {
      setLoading(true);
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      showToast("Data berhasil dikirim!", "success");
      setFormData({
        jenisFormulir: "",
        sektor: "",
        hotel: "",
        kloter: "",
        jumlahJamaah: "",
        tanggal: "",
        jam: ""
      });
      setKloterSearch("");
    } catch (error) {
      showToast("Koneksi gagal, silakan coba lagi.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="layout">
        {/* HEADER */}
        <header className="header">
          <div className="header-inner">
            <div className="logo-icon">
              <Building2 color="white" size={24} />
            </div>
            <div className="logo-text">Akomodasi Daker Madinah</div>
          </div>
        </header>

        {/* MAIN */}
        <main className="main">
          <div className="form-card">
            <div className="form-header">
              <h1>Kedatangan & Pendorongan</h1>
              <p>Sistem pencatatan operasi perhotelan jamaah</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Jenis Aktivitas</label>
                <div className="input-wrapper">
                  <FileText className="field-icon" size={20} />
                  <select
                    name="jenisFormulir"
                    value={formData.jenisFormulir}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Pilih Jenis Aktivitas</option>
                    <option value="Kedatangan">Kedatangan</option>
                    <option value="Pendorongan">Pendorongan</option>
                  </select>
                  <ChevronDown className="select-arrow" size={20} />
                </div>
              </div>

              <div className="field">
                <label>Tanggal</label>
                <div className="input-wrapper">
                  <Calendar className="field-icon" size={20} />
                  <input
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleChange}
                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                  />
                </div>
              </div>

              <div className="field">
                <label>
                  {formData.jenisFormulir === "Pendorongan" ? "Jam Check-out" : "Jam Check-in"}
                </label>
                <div className="input-wrapper">
                  <Clock className="field-icon" size={20} />
                  <input
                    type="time"
                    name="jam"
                    value={formData.jam}
                    onChange={handleChange}
                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                  />
                </div>
              </div>

              <div className="field" ref={kloterRef}>
                <label>Kloter</label>
                <div className="input-wrapper">
                  <MapPin className="field-icon" size={20} />
                  <input
                    type="text"
                    name="kloter"
                    value={kloterSearch}
                    onChange={(e) => {
                      setKloterSearch(e.target.value);
                      setShowKloterDropdown(true);
                      setFormData(prev => ({ ...prev, kloter: e.target.value }));
                    }}
                    onFocus={() => setShowKloterDropdown(true)}
                    placeholder="Ketik atau pilih Kloter..."
                    autoComplete="off"
                  />
                  {showKloterDropdown && (
                    <ul className="custom-dropdown">
                      {kloterList
                        .filter(s => s.toLowerCase().includes(kloterSearch.toLowerCase()))
                        .map((s) => (
                          <li
                            key={s}
                            onClick={() => {
                              setKloterSearch(s);
                              setFormData(prev => ({ ...prev, kloter: s }));
                              setShowKloterDropdown(false);
                            }}
                          >
                            {s}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="field">
                <label>Sektor</label>
                <div className="input-wrapper">
                  <MapPin className="field-icon" size={20} />
                  <select
                    name="sektor"
                    value={formData.sektor}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Pilih Sektor</option>
                    {Object.keys(hotelBySektor).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="select-arrow" size={20} />
                </div>
              </div>

              <div className="field">
                <label>Hotel</label>
                <div className="input-wrapper">
                  <Building2 className="field-icon" size={20} />
                  <select
                    name="hotel"
                    value={formData.hotel}
                    onChange={handleChange}
                    disabled={!formData.sektor}
                  >
                    <option value="" disabled>Pilih Hotel</option>
                    {formData.sektor &&
                      hotelBySektor[formData.sektor].map((h) => (
                        <option key={h.id} value={h.id}>{h.id} - {h.name}</option>
                      ))}
                  </select>
                  <ChevronDown className="select-arrow" size={20} />
                </div>
              </div>

              <div className="field">
                <label>Jumlah Jamaah</label>
                <div className="input-wrapper">
                  <Users className="field-icon" size={20} />
                  <input
                    type="number"
                    name="jumlahJamaah"
                    value={formData.jumlahJamaah}
                    onChange={handleChange}
                    placeholder="Masukkan jumlah"
                    min="1"
                  />
                </div>
              </div>



              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="spinner" size={20} />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Kirim Data</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </main>

        {/* TOAST NOTIFICATION */}
        <div className={`toast ${toast.type} ${toast.show ? 'show' : ''}`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span>{toast.message}</span>
        </div>

        {/* FOOTER */}
        <footer className="footer">
          © 2026 IT Team Daker Madinah | <a href="https://www.instagram.com/fajar.ah/" target="_blank" rel="noopener noreferrer">@fajarah</a>
        </footer>
      </div>
    </>
  );
}

export default App;