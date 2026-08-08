import React, { useState } from 'react';
import {
  Palette,
  ExternalLink,
  ShoppingBag,
  Instagram,
  PlusCircle,
  Eye,
  Heart,
  Sparkles,
  X,
  CheckCircle2,
  Store,
  MapPin,
  Tag,
  MessageCircle,
} from 'lucide-react';
import { CREATORS } from '../data/bogorData';
import { Creator, CreatorProduct } from '../types';
import { generateAnimatedSvg } from '../utils/animatedIllustration';

export const ModuleCreatorHub: React.FC = () => {
  const [creatorsList, setCreatorsList] = useState<Creator[]>(CREATORS);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);

  // New creator registration form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'ilustrasi' as Creator['category'],
    bio: '',
    address: '',
    productName: '',
    productPrice: '',
    productDesc: '',
    contactUrl: '',
    tokopedia: '',
    shopee: '',
    instagram: '',
  });

  const filteredCreators = creatorsList.filter(
    (c) => selectedCategory === 'all' || c.category === selectedCategory
  );

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address) {
      alert('Mohon lengkapi nama dan alamat kreator!');
      return;
    }

    const newCreator: Creator = {
      id: `creator_${Date.now()}`,
      name: formData.name,
      category: formData.category,
      bio: formData.bio || 'Kreator lokal Kota Bogor.',
      avatar: generateAnimatedSvg(formData.name, 'avatar'),
      portfolio: [
        generateAnimatedSvg(formData.name, formData.category),
      ],
      address: formData.address,
      products: formData.productName
        ? [
            {
              id: `p_${Date.now()}`,
              name: formData.productName,
              price: Number(formData.productPrice) || 50000,
              description: formData.productDesc || 'Produk lokal berkualitas.',
              contactUrl: formData.contactUrl || formData.tokopedia || formData.instagram,
            },
          ]
        : [],
      links: {
        tokopedia: formData.tokopedia,
        shopee: formData.shopee,
        instagram: formData.instagram,
      },
      stats: { views: 10, clicks: 2 },
    };

    setCreatorsList([newCreator, ...creatorsList]);
    setIsRegisterModalOpen(false);
    alert('Pendaftaran Kreator Berhasil! Profil kamu sudah aktif di SaBo Creator Hub.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Banner Header */}
      <div className="bg-slate-900/40 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-sky-500/15 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Collaboration Pop-Up & Direct Connection</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-300">
            Creator Showcase Bogor
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Dukung seniman, komunitas, dan pengrajin lokal Kota Bogor secara langsung.
            Tanpa potongan biaya perantara (<span className="text-sky-300 font-bold">Zero Platform Fee</span>) untuk kemajuan ekonomi kreatif daerah.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold rounded-2xl shadow-lg shadow-sky-500/25 transition flex items-center space-x-2 text-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Daftar Sebagai Creator Lokal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex space-x-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl font-bold transition backdrop-blur-md ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            Semua Kreator
          </button>
          <button
            onClick={() => setSelectedCategory('komunitas')}
            className={`px-4 py-2 rounded-xl font-bold transition backdrop-blur-md ${
              selectedCategory === 'komunitas'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            👥 Komunitas
          </button>
          <button
            onClick={() => setSelectedCategory('ilustrasi')}
            className={`px-4 py-2 rounded-xl font-bold transition backdrop-blur-md ${
              selectedCategory === 'ilustrasi'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            🎨 Ilustrasi & Seni
          </button>
          <button
            onClick={() => setSelectedCategory('kriya')}
            className={`px-4 py-2 rounded-xl font-bold transition backdrop-blur-md ${
              selectedCategory === 'kriya'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            🧵 Kriya & Batik
          </button>
          <button
            onClick={() => setSelectedCategory('desain')}
            className={`px-4 py-2 rounded-xl font-bold transition backdrop-blur-md ${
              selectedCategory === 'desain'
                ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            📐 Desain Grafis
          </button>
        </div>

        <span className="text-xs text-slate-400 font-medium">
          Menampilkan {filteredCreators.length} Kreator & Komunitas
        </span>
      </div>

      {/* Creator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCreators.map((creator) => (
          <div
            key={creator.id}
            className="bg-slate-900/40 backdrop-blur-xl border border-white/10 hover:border-sky-400/40 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-sky-500/10 transition duration-300 flex flex-col group"
          >
            {/* Portfolio Preview Cover */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-800">
              <img
                src={creator.portfolio[0] || generateAnimatedSvg(creator.name, creator.category)}
                alt={creator.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

              <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-sky-300 px-2.5 py-1 rounded-full border border-white/10">
                {creator.category}
              </span>

              <span className="absolute top-3 right-3 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-400/30 backdrop-blur-md">
                Zero Fee
              </span>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center space-x-3">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-12 h-12 rounded-2xl bg-slate-800 border border-sky-400/40 object-cover flex-shrink-0 shadow"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-extrabold text-sm text-white truncate group-hover:text-sky-300 transition">
                      {creator.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-sky-400" />
                      <span>{creator.address}</span>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {creator.bio}
                </p>
              </div>

              {/* Product list preview */}
              {creator.products.length > 0 && (
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10 space-y-2 backdrop-blur-md">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Produk Unggulan:
                  </span>
                  {creator.products.slice(0, 1).map((prod) => (
                    <div
                      key={prod.id}
                      className="flex justify-between items-center text-xs"
                    >
                      <span className="text-slate-200 truncate pr-2 font-medium">
                        {prod.name}
                      </span>
                      <span className="text-emerald-400 font-extrabold whitespace-nowrap">
                        Rp {prod.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCreator(creator)}
                  className="flex-1 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold rounded-xl transition text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-sky-500/20"
                >
                  <Eye className="w-4 h-4" />
                  <span>Collaboration Pop-Up</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Collaboration Pop-Up Modal */}
      {selectedCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl overflow-y-auto">
          <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/15 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white my-auto">
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 border-b border-white/10 flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedCreator.avatar}
                  alt={selectedCreator.name}
                  className="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-sky-400 object-cover shadow"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-400/30">
                    {selectedCreator.category}
                  </span>
                  <h3 className="font-extrabold text-lg text-white mt-1">
                    {selectedCreator.name}
                  </h3>
                  <p className="text-xs text-slate-300">{selectedCreator.address}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCreator(null)}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-slate-300 border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Bio */}
              <div>
                <h4 className="text-xs font-bold uppercase text-sky-400 mb-1">
                  Profil & Cerita Karya
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedCreator.bio}
                </p>
              </div>

              {/* Portfolio Gallery */}
              {selectedCreator.portfolio.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase text-sky-400 mb-2">
                    Galeri Karya & Portofolio
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedCreator.portfolio.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Portofolio ${idx}`}
                        className="w-full h-32 object-cover rounded-2xl border border-white/10 bg-slate-800"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Products Catalog */}
              {selectedCreator.products.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase text-sky-400 mb-2 flex items-center gap-1">
                    <Store className="w-4 h-4" /> Katalog Produk & Karya Resmi
                  </h4>
                  <div className="space-y-2">
                    {selectedCreator.products.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                      >
                        <div className="space-y-1 min-w-0 flex-1">
                          <h5 className="font-bold text-xs text-white">
                            {prod.name}
                          </h5>
                          <p className="text-[11px] text-slate-400">
                            {prod.description}
                          </p>
                          <span className="inline-block text-emerald-400 font-extrabold text-sm">
                            Rp {prod.price.toLocaleString('id-ID')}
                          </span>
                        </div>

                        <a
                          href={prod.contactUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition whitespace-nowrap flex items-center space-x-1 shadow"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Beli Langsung</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Connection Social Links */}
              <div>
                <h4 className="text-xs font-bold uppercase text-sky-400 mb-2">
                  Tautan Langsung Marketplace & Sosmed (Zero Fee)
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedCreator.links.tokopedia && (
                    <a
                      href={selectedCreator.links.tokopedia}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold rounded-xl border border-emerald-500/40 flex items-center space-x-1.5 transition shadow"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Tokopedia Resmi</span>
                    </a>
                  )}

                  {selectedCreator.links.shopee && (
                    <a
                      href={selectedCreator.links.shopee}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-orange-700/80 hover:bg-orange-600 text-white font-bold rounded-xl border border-orange-500/40 flex items-center space-x-1.5 transition shadow"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Shopee Resmi</span>
                    </a>
                  )}

                  {selectedCreator.links.instagram && (
                    <a
                      href={selectedCreator.links.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-pink-700/80 hover:bg-pink-600 text-white font-bold rounded-xl border border-pink-500/40 flex items-center space-x-1.5 transition shadow"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>Instagram</span>
                    </a>
                  )}

                  {selectedCreator.links.whatsapp && (
                    <a
                      href={selectedCreator.links.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl border border-emerald-400/40 flex items-center space-x-1.5 transition shadow"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Kontak</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Creator Registration Modal Form */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl overflow-y-auto">
          <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/15 w-full max-w-lg rounded-3xl shadow-2xl p-6 text-white my-auto space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-sky-400" />
                Daftar Sebagai Creator Lokal SaBo
              </h3>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Nama Kreator / Komunitas *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sanggar Batik Pakuan"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Kategori *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as Creator['category'],
                      })
                    }
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="ilustrasi">Ilustrasi & Seni</option>
                    <option value="kriya">Kriya & Batik</option>
                    <option value="desain">Desain Grafis</option>
                    <option value="komunitas">Komunitas</option>
                    <option value="fotografi">Fotografi & Video</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Alamat Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Jl. Pajajaran No. 12"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Deskripsi / Bio Kreator
                </label>
                <textarea
                  rows={2}
                  placeholder="Ceritakan tentang karya dan latar belakang kamu..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              {/* Product item details */}
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10 space-y-2">
                <span className="font-bold text-sky-400 block">
                  🛍️ Tambahkan Produk Utama
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Nama Produk"
                    value={formData.productName}
                    onChange={(e) =>
                      setFormData({ ...formData, productName: e.target.value })
                    }
                    className="bg-slate-950/80 border border-white/10 rounded-xl p-2 text-white"
                  />
                  <input
                    type="number"
                    placeholder="Harga (Rp)"
                    value={formData.productPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, productPrice: e.target.value })
                    }
                    className="bg-slate-950/80 border border-white/10 rounded-xl p-2 text-white"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Deskripsi singkat produk"
                  value={formData.productDesc}
                  onChange={(e) =>
                    setFormData({ ...formData, productDesc: e.target.value })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2 text-white"
                />
              </div>

              {/* Links */}
              <div className="space-y-2">
                <label className="block text-slate-300 font-semibold">
                  Tautan Toko / Media Sosial (Pilih salah satu)
                </label>
                <input
                  type="url"
                  placeholder="Link Tokopedia (https://tokopedia.com/...)"
                  value={formData.tokopedia}
                  onChange={(e) =>
                    setFormData({ ...formData, tokopedia: e.target.value })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2 text-white"
                />
                <input
                  type="url"
                  placeholder="Link Shopee (https://shopee.co.id/...)"
                  value={formData.shopee}
                  onChange={(e) =>
                    setFormData({ ...formData, shopee: e.target.value })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2 text-white"
                />
                <input
                  type="url"
                  placeholder="Link Instagram (https://instagram.com/...)"
                  value={formData.instagram}
                  onChange={(e) =>
                    setFormData({ ...formData, instagram: e.target.value })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-2 text-white"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-slate-300 font-semibold rounded-xl border border-white/10"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold rounded-xl shadow-lg shadow-sky-500/25"
                >
                  Daftarkan Kreator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
