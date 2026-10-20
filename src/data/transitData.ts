export interface TransitStop {
  id: string;
  name: string;
  transferLines?: string[];
  nearbyLandmark: string;
  coordinates?: { lat: number; lng: number };
}

export interface TransitLine {
  id: string;
  name: string;
  code: string;
  color: string;
  fare: string;
  operatingHours: string;
  headway: string;
  startTerminal: string;
  endTerminal: string;
  overview: string;
  stops: TransitStop[];
}

export const BISKITA_CORRIDORS: TransitLine[] = [
  {
    id: 'k1',
    code: 'K1',
    name: 'Koridor 1: Terminal Bubulak - Ciawi',
    color: '#3B82F6', // Blue
    fare: 'Rp 4.000 (Kartu Uang Elektronik)',
    operatingHours: '05.00 - 21.00 WIB',
    headway: 'Setiap 10-15 Menit',
    startTerminal: 'Terminal Bubulak',
    endTerminal: 'Pasar Ciawi',
    overview: 'Menghubungkan kawasan Bogor Barat hingga Ciawi melewati pusat kota dan ring Kebun Raya.',
    stops: [
      { id: 'k1_1', name: 'Terminal Bubulak', nearbyLandmark: 'Pool Utama Barat' },
      { id: 'k1_2', name: 'Halte Yasmin Sektor 6', nearbyLandmark: 'Pusat Perbelanjaan' },
      { id: 'k1_3', name: 'Halte RS Hermina', nearbyLandmark: 'Fasilitas Kesehatan' },
      { id: 'k1_4', name: 'Halte Air Mancur', nearbyLandmark: 'Taman Air Mancur & Kuliner Martabak' },
      { id: 'k1_5', name: 'Halte PMI Kota Bogor', nearbyLandmark: 'Pintu Masuk 2 Kebun Raya Bogor' },
      { id: 'k1_6', name: 'Halte Sukasari', nearbyLandmark: 'Pusat Asinan & Roti Unyil' },
      { id: 'k1_7', name: 'Halte Ciawi', nearbyLandmark: 'Gerbang Jalur Puncak' },
    ],
  },
  {
    id: 'k2',
    code: 'K2',
    name: 'Koridor 2: Terminal Bubulak - Ciawi via Suryakencana',
    color: '#F59E0B', // Amber
    fare: 'Rp 4.000 (Kartu Uang Elektronik)',
    operatingHours: '05.00 - 21.00 WIB',
    headway: 'Setiap 12-15 Menit',
    startTerminal: 'Terminal Bubulak',
    endTerminal: 'Ciawi',
    overview: 'Rute utama wisata kuliner dan pecinan melewati Jalan Suryakencana dan Vihara Dhanagun.',
    stops: [
      { id: 'k2_1', name: 'Terminal Bubulak', nearbyLandmark: 'Stasiun Barat' },
      { id: 'k2_2', name: 'Halte Budi Kemuliaan', nearbyLandmark: 'Pusat Edukasi' },
      { id: 'k2_3', name: 'Halte Bappeda / Balaikota', nearbyLandmark: 'Istana Bogor Pintu Utama' },
      { id: 'k2_4', name: 'Halte Suryakencana', nearbyLandmark: 'Kawasan Wisata Pecinan & Bir Kotjok' },
      { id: 'k2_5', name: 'Halte Gang Aut', nearbyLandmark: 'Sentra Laksa & Lumpia Basah' },
      { id: 'k2_6', name: 'Halte Batutulis Dekat', nearbyLandmark: 'Situs Bersejarah Prasasti Batutulis' },
      { id: 'k2_7', name: 'Pasar Ciawi', nearbyLandmark: 'Pasar Tradisional' },
    ],
  },
  {
    id: 'k5',
    code: 'K5',
    name: 'Koridor 5: Ciparigi - Stasiun Bogor',
    color: '#10B981', // Emerald
    fare: 'Rp 4.000 (Kartu Uang Elektronik)',
    operatingHours: '05.00 - 21.30 WIB',
    headway: 'Setiap 8-10 Menit',
    startTerminal: 'Ciparigi',
    endTerminal: 'Stasiun Kereta Bogor',
    overview: 'Koridor favorit para pengguna kereta komuter dari Jabodetabek menuju destinasi heritage.',
    stops: [
      { id: 'k5_1', name: 'Terminal Ciparigi', nearbyLandmark: 'Bogor Utara' },
      { id: 'k5_2', name: 'Halte Simpang Pomad', nearbyLandmark: 'Koneksi Angkot' },
      { id: 'k5_3', name: 'Halte Jambu Dua', nearbyLandmark: 'Plaza Jambu Dua' },
      { id: 'k5_4', name: 'Halte Taman Kencana', nearbyLandmark: 'Klaster Kuliner Macaroni Panggang & Pie Apel' },
      { id: 'k5_5', name: 'Halte Alun-Alun Bogor', nearbyLandmark: 'Taman Terbuka Hijau & Masjid Agung' },
      { id: 'k5_6', name: 'Halte Stasiun Bogor', nearbyLandmark: 'Stasiun KRL Commuter Line 1881' },
    ],
  },
];
