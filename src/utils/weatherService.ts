import { BogorWeatherData } from '../types';

// WMO Weather interpretation
export function decodeWmoWeather(code: number, isDay: boolean = true) {
  if (code === 0) {
    return {
      label: isDay ? 'Cerah Bersemangat' : 'Malam Cerah Bertabur Bintang',
      labelEn: isDay ? 'Sunny & Clear Sky' : 'Clear Starlit Night',
      icon: isDay ? '☀️' : '🌙',
      type: 'sunny',
    };
  }
  if (code >= 1 && code <= 3) {
    return {
      label: 'Cerah Berawan Sejuk',
      labelEn: 'Partly Cloudy & Pleasant',
      icon: isDay ? '⛅' : '☁️',
      type: 'cloudy',
    };
  }
  if (code >= 45 && code <= 48) {
    return {
      label: 'Berkabut Lembah Salak',
      labelEn: 'Salak Valley Mist & Fog',
      icon: '🌫️',
      type: 'mist',
    };
  }
  if (code >= 51 && code <= 57) {
    return {
      label: 'Gerimis Khas Kota Hujan',
      labelEn: 'Signature Bogor Drizzle',
      icon: '🌦️',
      type: 'rain',
    };
  }
  if (code >= 61 && code <= 67) {
    return {
      label: 'Hujan Rintik Menyegarkan',
      labelEn: 'Refreshing Bogor Rain',
      icon: '🌧️',
      type: 'rain',
    };
  }
  if (code >= 80 && code <= 82) {
    return {
      label: 'Hujan Lebat Kota Hujan',
      labelEn: 'Heavy Rain Downpour',
      icon: '🌧️',
      type: 'heavy_rain',
    };
  }
  if (code >= 95) {
    return {
      label: 'Hujan Petir Menggelegar',
      labelEn: 'Thunderstorm with Lightning',
      icon: '⛈️',
      type: 'storm',
    };
  }
  return {
    label: 'Berawan Khas Bogor',
    labelEn: 'Overcast & Cool',
    icon: '☁️',
    type: 'cloudy',
  };
}

// Compute Heritage Mood according to weather conditions
export function computeHeritageMood(
  weatherCode: number,
  rainMm: number,
  temp: number
): BogorWeatherData['heritageMood'] {
  const isStorm = weatherCode >= 95;
  const isRainy = (weatherCode >= 51 && weatherCode <= 82) || rainMm > 0.5;
  const isMisty = weatherCode >= 45 && weatherCode <= 48;
  const isSunny = weatherCode === 0 && temp >= 28;

  if (isStorm) {
    return {
      status: 'storm_caution',
      title: 'Peringatan Hujan Petir: Prioritaskan Museum Indoor',
      titleEn: 'Thunderstorm Alert: Indoor Museums Strongly Advised',
      advice:
        'Kilat petir dan angin kencang berisiko di bawah pohon purba tinggi Kebun Raya. Segera kunjungi Museum Balai Kirti, Museum Zoologi, atau hangatkan diri di kedai Kopi Liong Suryakencana.',
      adviceEn:
        'Lightning risks under tall ancient canopies. Sheltered heritage spots like Balai Kirti and Zoologi Museum are ideal sanctuaries.',
      recommendedHeritageIds: ['istana_bogor', 'prasasti_batutulis'],
      cautionHeritageIds: ['kebun_raya_bogor'],
    };
  }

  if (isRainy) {
    return {
      status: 'rain_sheltered',
      title: 'Suasana Syahdu Kota Hujan: Wisata Museum & Kuliner Hangat',
      titleEn: 'Signature Rainy Bogor: Indoor Relics & Steaming Culinary',
      advice:
        'Hujan menyelimuti Kota Hujan! Sangat pas untuk menjelajahi Museum Kepresidenan Balai Kirti, Prasasti Batutulis (beratap pendopo), serta menikmati semangkuk Soto Mie panas dan Bir Kotjok jahe hangat.',
      adviceEn:
        'Romantic rainfall embraces Bogor! Perfect timing for covered pavilions, Batutulis Inscription, and steaming hot beef noodle soup.',
      recommendedHeritageIds: ['istana_bogor', 'prasasti_batutulis'],
      cautionHeritageIds: ['kebun_raya_bogor'],
    };
  }

  if (isMisty) {
    return {
      status: 'mist_atmospheric',
      title: 'Kabut Pagi Asri: Suasana Magis Fotografi Kebun Raya',
      titleEn: 'Misty Morning: Magical Photography in Botanic Gardens',
      advice:
        'Kabut sejuk mengalir dari lereng Gunung Salak. Danau Gunting dan deretan pohon Kenari Kebun Raya tampil sangat fotogenik dan tenang.',
      adviceEn:
        'Cool morning mist descends from Mount Salak. Gunting Lake and century-old canopy trails look utterly ethereal.',
      recommendedHeritageIds: ['kebun_raya_bogor', 'istana_bogor', 'tugu_kujang'],
      cautionHeritageIds: [],
    };
  }

  if (isSunny) {
    return {
      status: 'sunny_energetic',
      title: 'Cerah Bersemangat: Waktu Emas Eksplorasi Alam Terbuka',
      titleEn: 'Sunny & Crisp: Prime Golden Hour for Outdoor Parks',
      advice:
        'Langit biru cerah! Abadikan kemegahan arsitektur putih Istana Bogor, kelilingi Kebun Raya dengan sepeda listrik, dan segarkan diri dengan Asinan Sedap Gedung Dalam dingin.',
      adviceEn:
        'Bright sunny skies! Best hour for photographing the Palace façade and cycling along the Botanical pathways.',
      recommendedHeritageIds: ['kebun_raya_bogor', 'tugu_kujang', 'istana_bogor'],
      cautionHeritageIds: [],
    };
  }

  // Pleasant Overcast
  return {
    status: 'cloudy_pleasant',
    title: 'Cuaca Teduh Nyaman: Ideal untuk Berjalan Kaki & Tur Tematik',
    titleEn: 'Pleasantly Overcast: Ideal Walking & Heritage Trail Weather',
    advice:
      'Suhu sejuk 25°-27°C tanpa terik matahari menyengat. Seluruh destinasi luar dan dalam ruangan dalam kondisi kenyamanan maksimal!',
    adviceEn:
      'Mild 25°-27°C temperature without harsh glare. All outdoor walking trails and indoor museums are operating in peak comfort!',
    recommendedHeritageIds: ['kebun_raya_bogor', 'istana_bogor', 'prasasti_batutulis', 'tugu_kujang'],
    cautionHeritageIds: [],
  };
}

// Fallback dynamic generator if offline or network fails
export function getSimulatedBogorWeather(preset?: string): BogorWeatherData {
  const now = new Date();
  const hour = now.getHours();
  const isDay = hour >= 6 && hour < 18;

  let code = 61; // Default rainy bogor
  let temp = 26.5;
  let humidity = 84;
  let rain = 1.2;
  let pop = 75;

  if (preset === 'sunny') {
    code = 0;
    temp = 29.5;
    humidity = 65;
    rain = 0;
    pop = 10;
  } else if (preset === 'cloudy') {
    code = 2;
    temp = 26.0;
    humidity = 76;
    rain = 0;
    pop = 25;
  } else if (preset === 'mist') {
    code = 45;
    temp = 23.5;
    humidity = 92;
    rain = 0.1;
    pop = 40;
  } else if (preset === 'storm') {
    code = 95;
    temp = 24.8;
    humidity = 95;
    rain = 8.5;
    pop = 95;
  } else {
    // Automatic based on typical Bogor afternoon rain pattern
    if (hour >= 13 && hour <= 17) {
      code = 63; // afternoon rain
      temp = 25.2;
      humidity = 88;
      rain = 2.4;
      pop = 80;
    } else if (hour >= 6 && hour <= 11) {
      code = 2; // morning pleasant
      temp = 26.8;
      humidity = 74;
      rain = 0;
      pop = 20;
    } else {
      code = 51; // night light drizzle
      temp = 24.0;
      humidity = 86;
      rain = 0.5;
      pop = 50;
    }
  }

  const decoded = decodeWmoWeather(code, isDay);
  const mood = computeHeritageMood(code, rain, temp);

  // 12-hour hourly forecast
  const hourlyForecast = Array.from({ length: 6 }).map((_, i) => {
    const fHour = (hour + i * 2) % 24;
    return {
      time: `${fHour.toString().padStart(2, '0')}:00`,
      temp: Math.round(temp + Math.sin(i) * 1.5),
      pop: Math.min(100, Math.max(10, Math.round(pop + (i % 2 === 0 ? 10 : -10)))),
      code: code,
    };
  });

  return {
    temperature: temp,
    apparentTemperature: temp + 2.1,
    humidity,
    windSpeed: 10.5,
    weatherCode: code,
    conditionLabel: decoded.label,
    conditionLabelEn: decoded.labelEn,
    icon: decoded.icon,
    isDay,
    rainMm: rain,
    precipitationProbability: pop,
    lastUpdated: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isLiveApi: false,
    hourlyForecast,
    heritageMood: mood,
  };
}

// Fetch real-time live weather from Open-Meteo for Kota Bogor
export async function fetchLiveBogorWeather(): Promise<BogorWeatherData> {
  try {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=-6.5950&longitude=106.8166&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code&timezone=Asia%2FJakarta&forecast_hours=12';

    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) {
      throw new Error(`Open-Meteo responded with status ${res.status}`);
    }

    const data = await res.json();
    const current = data.current;
    const hourly = data.hourly;

    const temp = Math.round(current.temperature_2m * 10) / 10;
    const apparent = Math.round(current.apparent_temperature * 10) / 10;
    const humidity = current.relative_humidity_2m;
    const wind = Math.round(current.wind_speed_10m * 10) / 10;
    const code = current.weather_code;
    const isDay = Boolean(current.is_day);
    const rainMm = current.rain || current.precipitation || 0;

    const decoded = decodeWmoWeather(code, isDay);
    const mood = computeHeritageMood(code, rainMm, temp);

    // Format first 6 forecast intervals
    const hourlyForecast = (hourly?.time || []).slice(0, 6).map((timeStr: string, idx: number) => {
      const date = new Date(timeStr);
      return {
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(hourly.temperature_2m[idx] || temp),
        pop: hourly.precipitation_probability ? hourly.precipitation_probability[idx] : 40,
        code: hourly.weather_code ? hourly.weather_code[idx] : code,
      };
    });

    const now = new Date();

    return {
      temperature: temp,
      apparentTemperature: apparent,
      humidity,
      windSpeed: wind,
      weatherCode: code,
      conditionLabel: decoded.label,
      conditionLabelEn: decoded.labelEn,
      icon: decoded.icon,
      isDay,
      rainMm,
      precipitationProbability: hourlyForecast[0]?.pop || 30,
      lastUpdated: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isLiveApi: true,
      hourlyForecast,
      heritageMood: mood,
    };
  } catch (err) {
    console.warn('Real-time weather API fetch failed, falling back to simulated Bogor climate:', err);
    return getSimulatedBogorWeather();
  }
}
