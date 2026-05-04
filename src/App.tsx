/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  ChevronRight, 
  Stethoscope, 
  Sparkles, 
  Zap, 
  UserCircle2 
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// --- Components ---

const Header = () => {
  const menuItems = [
    { name: '맑음소개', id: 'about' },
    { name: '여드름/모공', id: 'acne' },
    { name: '기미/잡티', id: 'pigment' },
    { name: '주름/탄력', id: 'lifting' },
    { name: '의료진', id: 'doctor' },
    { name: '오시는길', id: 'map' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="text-2xl font-serif font-bold tracking-tight text-clinic-gold">
            맑음<span className="text-clinic-dark">피부과</span>
          </div>
        </a>
        
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              className="text-sm font-medium hover:text-clinic-gold transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <a href="#map" className="hidden lg:block text-xs font-bold border border-clinic-gold text-clinic-gold px-4 py-2 hover:bg-clinic-gold hover:text-white transition-all uppercase tracking-widest">
            Appointment
          </a>
          <button className="p-2 md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  
  const images = [
    {
      url: "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=2073&auto=format&fit=crop",
      alt: "Spring Flowers"
    },
    {
      url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop",
      alt: "Clinic Background"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero" ref={containerRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <AnimatePresence mode="wait">
          <motion.img 
            key={index}
            src={images[index].url} 
            alt={images[index].alt} 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full object-cover brightness-[0.85]"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30" />
      </motion.div>
      
      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 text-center px-4"
      >
        <p className="font-serif italic text-xl md:text-2xl text-white mb-4 tracking-wide shadow-sm">
          Clear Skin, Clear Beauty
        </p>
        <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter drop-shadow-md">
          맑음<span className="text-clinic-gold">피부과</span>
        </h1>
        <div className="w-16 h-[2px] bg-clinic-gold mx-auto mb-8" />
        <p className="text-white/90 text-sm md:text-lg max-w-xl mx-auto font-light leading-relaxed mb-10">
          본연의 아름다움을 찾아드리는 맑음피부과에서<br />
          당신의 빛나는 일상을 다시 만나보세요.
        </p>
        <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-white hover:text-clinic-dark transition-all duration-500">
          상담 신청하기
        </button>
        
        {/* Slider Indicators */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex gap-3">
          {images.map((_, i) => (
            <button 
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-clinic-gold' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Intro = () => {
  return (
    <section id="about" className="py-24 bg-clinic-beige relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              피부 본래의 가치를 믿는<br />
              <span className="text-clinic-gold italic">‘순수한 고집’</span>
            </h2>
            <div className="space-y-6 text-clinic-muted leading-relaxed">
              <p>
                과도한 시술보다는 건강한 피부 본연의 힘을 기르는 것에 집중합니다. 
                개개인의 피부 특성을 심도 있게 분석하여, 가장 자연스럽고 조화로운 결과를 약속드립니다.
              </p>
              <p>
                맑음피부과는 단순한 미용 그 이상의 가치를 지향합니다. 
                피부 건강이 곧 삶의 질을 높이는 시작이라는 믿음으로, 매 순간 진심을 다해 진료하겠습니다.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop" 
              alt="Clean Skincare Aesthetic" 
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
              <div className="flex flex-col items-center justify-center h-full border border-clinic-gold/20 rounded-xl">
                <Sparkles className="text-clinic-gold w-8 h-8 mb-2" />
                <span className="text-xs font-bold text-clinic-gold tracking-widest text-center">BEST CLINIC 2024</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ id, icon: Icon, title, description, tags }: any) => (
  <motion.div 
    id={id}
    whileHover={{ y: -10 }}
    className="bg-white p-8 group border border-transparent hover:border-clinic-gold/20 transition-all duration-500 rounded-3xl"
  >
    <div className="w-14 h-14 bg-clinic-beige rounded-2xl flex items-center justify-center mb-6 group-hover:bg-clinic-gold transition-colors duration-500">
      <Icon className="w-6 h-6 text-clinic-gold group-hover:text-white transition-colors duration-500" />
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-clinic-muted text-sm leading-relaxed mb-6">{description}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: string) => (
        <span key={tag} className="text-[10px] uppercase tracking-wider text-clinic-gold bg-clinic-beige px-2 py-1 rounded">
          #{tag}
        </span>
      ))}
    </div>
  </motion.div>
);

const Clinics = () => {
  const services = [
    {
      id: "acne",
      icon: Stethoscope,
      title: "여드름 & 모공 센터",
      description: "반복되는 여드름의 근본 원인을 해결하고, 넓어진 모공과 흉터를 매끄럽게 복원하는 맞춤형 케어를 제공합니다.",
      tags: ["여드름압출", "LDM", "포텐자"]
    },
    {
      id: "pigment",
      icon: Sparkles,
      title: "색소 & 화이트닝",
      description: "기미, 주근깨, 잡티 없는 맑고 투명한 피부. 개인별 피부 톤과 색소 깊이를 분석하여 정교한 레이저 셰이핑을 진행합니다.",
      tags: ["피코토닝", "클라리티2", "미백코스"]
    },
    {
      id: "lifting",
      icon: Zap,
      title: "리프팅 & 안티에이징",
      description: "무너진 얼굴 라인을 되찾아드리는 강력한 탄력 솔루션. 울쎄라, 슈링크, 써마지 등 프리미엄 장비를 사용합니다.",
      tags: ["울쎄라", "써마지", "슈링크유니버스"]
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-clinic-gold tracking-[0.2em] uppercase mb-4 block">Medical Services</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">전문화된 진료 시스템</h2>
          <p className="text-clinic-muted max-w-2xl mx-auto">
            맑음피부과만의 숙련된 노하우와 첨단 장비를 바탕으로<br />
            가장 효율적인 피부 솔루션을 제안합니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

const DoctorProfile = () => {
  return (
    <section id="doctor" className="py-24 bg-clinic-beige overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="relative z-10"
          >
            <div className="inline-block px-4 py-1 border border-clinic-gold text-clinic-gold text-xs font-bold tracking-widest mb-6">
              REPRESENTATIVE DOCTOR
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              의학박사 <span className="text-clinic-gold">박맑음</span> 대표원장
            </h2>
            
            <div className="space-y-8">
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold text-clinic-dark mb-4 group">
                  <span className="w-1.5 h-1.5 bg-clinic-gold rounded-full" />
                  약력 및 학회 활동
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm text-clinic-muted font-light">
                  <li>· 연세대학교 의과대학 졸업</li>
                  <li>· 세브란스병원 피부과 전문의</li>
                  <li>· 대한피부과학회 정회원</li>
                  <li>· 대한레이저학회 창립위원</li>
                  <li>· 前 강남 유명 피부과 원장</li>
                  <li>· 現 맑음피부과 대표원장</li>
                </ul>
              </div>
              
              <div className="p-8 bg-white rounded-2xl border border-clinic-gold/10">
                <p className="text-clinic-muted italic leading-relaxed text-sm">
                  "피부는 우리 몸의 상태를 가장 잘 보여주는 거울입니다. 
                  단순한 증상 치료를 넘어, 환자분들의 마음까지 치유할 수 있는 
                  진심 어린 의사가 되겠다는 초심을 잃지 않겠습니다."
                </p>
              </div>
            </div>
          </motion.div>
          
          <div className="relative">
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="relative z-10 rounded-full overflow-hidden aspect-square border-[20px] border-white shadow-2xl max-w-md mx-auto"
            >
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=2070&auto=format&fit=crop" 
                alt="Doctor Portrait" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-clinic-gold/5 rounded-full -z-0 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

const MapSection = () => {
  return (
    <section id="map" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-3xl shadow-2xl border border-gray-100">
          <div className="lg:col-span-8 h-[500px] bg-slate-100 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1587.051910245051!2d127.0984854!3d37.1953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b46d795dc7c95%3A0xc3cf9b449bca7a!2z6rK96riw64-EIOtmkeyEsOyLnCDrj5n 탄euMgOuhnIDc3Nw!5e0!3m2!1sko!2skr!4v1714830000000!5m2!1sko!2skr" 
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700" 
              style={{ border: 0 }} 
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-4 bg-clinic-dark p-12 text-white">
            <div className="mb-12">
              <h3 className="text-3xl font-bold mb-8">CONTACT US</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-clinic-gold w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h5 className="text-xs font-bold text-clinic-gold tracking-widest mb-1">ADDRESS</h5>
                    <p className="text-sm text-white/70 leading-relaxed">경기도 화성시 동탄대로 777<br />퍼스트타워 201호</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="text-clinic-gold w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h5 className="text-xs font-bold text-clinic-gold tracking-widest mb-1">CALL</h5>
                    <p className="text-2xl font-serif font-bold text-white tracking-widest">031.234.5678</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="text-clinic-gold w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h5 className="text-xs font-bold text-clinic-gold tracking-widest mb-1">HOURS</h5>
                    <div className="text-sm text-white/70 space-y-1">
                      <p>평 일 | 10:00 - 19:30 (야간)</p>
                      <p>토요일 | 10:00 - 14:00 (점심無)</p>
                      <p>점 심 | 13:00 - 14:00</p>
                      <p className="text-clinic-gold">일요일·공휴일 | 휴무</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full py-4 border border-white/20 rounded-xl hover:bg-clinic-gold hover:border-clinic-gold transition-all duration-300 flex items-center justify-center gap-2">
              카카오톡 빠른 상담 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-clinic-beige py-20 border-t border-clinic-gold/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="text-2xl font-serif font-bold tracking-tight text-clinic-gold mb-6">
              맑음<span className="text-clinic-dark">피부과</span>
            </div>
            <p className="text-xs text-clinic-muted leading-loose">
              대표자 : 박맑음 | 사업자번호 : 123-45-67890<br />
              개인정보책임자 : 박맑음 | 의료기관명칭 : 맑음피부과의원<br />
              Copyright ⓒ 2024 MAREUM DERMATOLOGY CLINIC All Rights Reserved.
            </p>
          </div>
          
          <div>
            <h5 className="text-xs font-bold tracking-widest mb-6">QUICK LINKS</h5>
            <ul className="text-xs space-y-3 text-clinic-muted">
              <li><a href="#" className="hover:text-clinic-gold transition-colors">이용약관</a></li>
              <li><a href="#" className="hover:text-clinic-gold transition-colors">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-clinic-gold transition-colors">의료심의필</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-xs font-bold tracking-widest mb-6">SOCIAL</h5>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-100 hover:border-clinic-gold hover:text-clinic-gold transition-all group">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-100 hover:border-clinic-gold hover:text-clinic-gold transition-all">
                <UserCircle2 className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="text-right flex flex-col items-end">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent('https://맑음피부과.com')}`} 
              alt="QR" 
              className="w-24 h-24 mb-4 grayscale opacity-50"
            />
            <p className="text-[10px] text-clinic-muted text-right">모바일에서 맑음피부과를<br />더 편하게 만나보세요.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main>
        <Hero />
        <Intro />
        <Clinics />
        <DoctorProfile />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}
