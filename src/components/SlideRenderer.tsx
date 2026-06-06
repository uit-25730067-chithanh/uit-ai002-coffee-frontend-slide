import React from 'react';
import { Slide } from '../data/slidesData';
import { motion } from 'motion/react';

export default function SlideRenderer({ slide }: { slide: Slide }) {
  
  // Powerpoint header template
  const PPTHeader = ({ title }: { title: string }) => (
    <div className="w-full flex justify-between items-end border-b-4 border-blue-900 pb-4 mb-8">
      <h1 className="text-4xl text-blue-900 font-bold tracking-wide uppercase">{title}</h1>
      <div className="text-right flex flex-col">
        <span className="text-sm font-bold text-blue-800 uppercase tracking-wide">Trường Đại học Công nghệ Thông tin</span>
        <span className="text-xs font-bold text-gray-500 mt-1">ĐHQG-HCM | NHÓM 10 - DT10</span>
      </div>
    </div>
  );

  switch (slide.layout) {
    case 'cover':
      return (
        <div className="w-full h-full flex flex-col p-16 relative bg-white overflow-hidden">
          {slide.image && (
            <div className="absolute top-0 right-0 w-[75%] h-full z-0">
              <img src={slide.image} alt="Cover Background" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
            </div>
          )}
          
          <div className="z-10 relative flex flex-col h-full w-[60%]">
            <div className="mb-8 pt-4">
              <span className="text-sm font-bold text-blue-900 uppercase tracking-[0.2em]">
                Trường Đại học Công nghệ Thông tin - ĐHQG-HCM
              </span>
            </div>
            
            <div className="flex-1 flex flex-col justify-center -mt-8">
              <h1 className="text-[4rem] font-extrabold text-neutral-900 leading-[1.15] mb-6 drop-shadow-sm">
                {slide.title}
              </h1>
              <h2 className="text-[1.75rem] text-blue-700 font-semibold mb-8">
                {slide.subtitle}
              </h2>
              <div className="h-1.5 w-24 bg-blue-600 mb-8 rounded-full"></div>
              {slide.content?.map((text, i) => (
                <p key={i} className="text-xl text-neutral-600 font-medium">{text}</p>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-8 mt-auto border-t border-neutral-200">
              {slide.members?.map((m, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xl font-bold text-neutral-900">{m.name}</span>
                  <span className="text-base text-neutral-500 font-medium mt-1">{m.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'profile':
      return (
        <div className="w-full h-full p-16 flex flex-col bg-white">
          <div className="flex justify-between items-end mb-4">
            <span className="text-lg font-bold text-blue-900 uppercase">Trường Đại học Công nghệ Thông tin - ĐHQG-HCM</span>
            <span className="text-sm font-bold text-gray-500">NHÓM 10 - DT10</span>
          </div>
          <div className="flex justify-between items-center bg-blue-900 text-white p-6 mb-8 shadow-md">
            <div>
              <h1 className="text-4xl font-bold">{slide.title}</h1>
              <h2 className="text-xl mt-2 text-blue-200">{slide.subtitle}</h2>
            </div>
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-900 font-bold text-2xl border-4 border-blue-200 shrink-0">
               {slide.title.split(' ').pop()?.charAt(0)}
            </div>
          </div>
          
          <div className="flex-1 px-8 pt-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 uppercase">Phân công nhiệm vụ:</h3>
            <ul className="space-y-6">
              {slide.content?.map((item, i) => (
                <li key={i} className="flex gap-4 items-start text-2xl text-gray-700">
                  <span className="text-blue-600 font-bold text-3xl leading-none">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );

    case 'bullets':
      return (
        <div className="w-full h-full p-16 flex flex-col bg-white overflow-hidden relative">
          <PPTHeader title={slide.title} />
          
          <div className={`flex-1 mt-4 min-h-0 ${slide.image ? 'flex gap-12' : ''}`}>
            <div className={`h-full flex flex-col justify-center ${slide.image ? 'w-[55%] shrink-0' : 'w-full'}`}>
              <ul className="space-y-6 px-4">
                {slide.content?.map((item, i) => {
                  const isHeading = item.endsWith(':') || item.includes('Kết luận:') || item.includes('Hướng phát triển:') || item.includes('Nhấn mạnh:');
                  if (isHeading && !item.includes('<b')) {
                    return (
                      <li key={i} className={`flex gap-4 items-start text-3xl font-bold text-blue-900 mt-8`}>
                        <span dangerouslySetInnerHTML={{ __html: item }}></span>
                      </li>
                    )
                  }
                  return (
                    <li key={i} className={`flex gap-4 items-start text-[1.65rem] text-neutral-800 leading-snug`}>
                      <span className="text-blue-600 font-bold text-3xl leading-none shrink-0 mt-1">•</span>
                      <span dangerouslySetInnerHTML={{ __html: item.replace(/^([^:]+):/g, '<b className="text-neutral-900">$1:</b>') }}></span>
                    </li>
                  );
                })}
              </ul>
            </div>
            {slide.image && (
              <div className="w-[45%] h-full relative">
                <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-200" />
              </div>
            )}
          </div>
          
          {slide.disclaimer && (
            <div className="mt-8 bg-gray-100 border-l-4 border-red-500 p-4 text-xl text-gray-700 italic shrink-0 relative z-10">
              <strong>Lưu ý: </strong> {slide.disclaimer}
            </div>
          )}
        </div>
      );

    case 'split':
      return (
        <div className="w-full h-full p-16 flex flex-col bg-white">
          <PPTHeader title={slide.title} />
          
          <div className="flex-1 grid grid-cols-2 gap-16 px-4">
            <div>
              <ul className="space-y-6">
                {slide.leftContent?.map((item, i) => {
                  const isHeading = item.includes(':') && i === 0;
                  return (
                    <li key={i} className={`flex gap-4 items-start ${isHeading ? 'text-3xl font-bold text-blue-900 mb-4 border-b pb-4' : 'text-2xl text-gray-800'}`}>
                      {!isHeading && <span className="text-blue-600 font-bold text-3xl leading-none shrink-0">•</span>}
                      <span>{item}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div>
              <ul className="space-y-6">
                {slide.rightContent?.map((item, i) => {
                  const isHeading = item.includes(':') && i === 0;
                  return (
                    <li key={i} className={`flex gap-4 items-start ${isHeading ? 'text-3xl font-bold text-green-700 mb-4 border-b pb-4' : 'text-2xl text-gray-800'}`}>
                      {!isHeading && <span className="text-green-600 font-bold text-3xl leading-none shrink-0">•</span>}
                      <span>{item}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      );

    case 'flow':
       return (
        <div className="w-full h-full p-10 flex flex-col bg-white">
          <PPTHeader title={slide.title} />
          
          {/* Top part: 3 Column Process Diagram */}
          <div className="flex-1 flex justify-between items-stretch mt-6 mb-4 px-4 gap-4 min-h-0">
            
            {/* Step 1 */}
            <div className="flex-1 flex flex-col relative z-10">
              <div className="bg-blue-900 text-white rounded-t-2xl p-4 flex flex-col items-center text-center relative border border-blue-900 shadow-md">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-blue-900 text-white rounded-full flex items-center justify-center text-2xl font-bold border-4 border-white shadow-sm">1</div>
                <h3 className="font-bold text-2xl mt-4 mb-1 tracking-wide text-white">Dữ liệu thô hằng ngày</h3>
                <p className="italic text-blue-100 font-serif text-base">Raw Daily Prices & Weather</p>
              </div>
              <div className="flex-1 bg-white border-2 border-blue-100 border-t-0 rounded-b-2xl p-4 flex flex-col justify-between shadow-sm">
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="relative h-14 w-14 mb-1 text-blue-700/80">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="m11.5 6.5 2 2-2 2-2-2 2-2Z"/><path d="m15.5 10.5 2 2-2 2-2-2 2-2Z"/><path d="m7.5 10.5 2 2-2 2-2-2 2-2Z"/><path d="M3 21h18"/><path d="m3 17 6-6 4 4 8-8"/><path d="M21 3v6"/></svg>
                    </div>
                    <p className="text-sm font-medium text-gray-700 leading-snug">Dữ liệu giá cà phê hằng ngày</p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="h-14 w-14 text-blue-400 mb-1">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-slate-400 relative z-10 bg-white rounded-full mix-blend-multiply"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>
                    </div>
                    <p className="text-sm font-medium text-gray-700 leading-snug">Dữ liệu thời tiết hằng ngày</p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="h-14 w-14 text-blue-900 mb-1">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 5c0 1.66 4 3 9 3s9-1.34 9-3"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/><path d="M3 19c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>
                    </div>
                    <p className="text-sm font-medium text-gray-700 leading-snug">Đầu vào thô<br/>(raw input)</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-center gap-2 text-blue-900 font-semibold bg-gray-50/50 rounded-lg p-2 text-base z-30">
                  <div className="p-1 border border-blue-900 rounded bg-white text-blue-900 shadow-sm"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></div>
                  <span>Thu thập từ nhiều nguồn mỗi ngày</span>
                </div>
              </div>
            </div>

            {/* Connecting Arrow 1 */}
            <div className="flex items-center justify-center w-8 shrink-0 relative mt-16">
               <div className="absolute h-1.5 bg-blue-800 w-16 z-0"></div>
               <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-blue-800 border-b-[8px] border-b-transparent absolute left-8"></div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 flex flex-col relative z-10">
              <div className="bg-blue-800 text-white rounded-t-2xl p-4 flex flex-col items-center text-center relative border border-blue-800 shadow-md">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-blue-800 text-white rounded-full flex items-center justify-center text-2xl font-bold border-4 border-white shadow-sm">2</div>
                <h3 className="font-bold text-2xl mt-4 mb-1 tracking-wide text-white">Dataset Tuần</h3>
                <p className="text-blue-100 font-semibold text-base drop-shadow-sm">2520 dòng</p>
              </div>
              <div className="flex-1 bg-white border-2 border-blue-100 border-t-0 rounded-b-2xl p-4 flex flex-col justify-between shadow-sm">
                <div className="flex justify-around items-center h-full px-2 pt-2">
                  <div className="flex flex-col items-center">
                    <div className="h-16 w-16 text-blue-500/80 mb-2 relative">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full opacity-30"><path d="M8 2v4M16 2v4M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full absolute inset-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                      <div className="absolute -bottom-2 -right-2 bg-blue-800 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white text-white">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-px h-16 bg-gray-200"></div>
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 text-blue-700/80 mb-2 relative flex items-end justify-center gap-1">
                      <div className="w-3 bg-blue-400 rounded-t-sm h-4"></div>
                      <div className="w-3 bg-blue-600 rounded-t-sm h-8"></div>
                      <div className="w-3 bg-blue-800 rounded-t-sm h-12"></div>
                    </div>
                    <p className="text-sm font-medium text-gray-700">Tổng hợp<br/>theo tuần</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-center gap-2 text-blue-900 font-semibold bg-gray-50/50 rounded-lg p-2 text-base z-30">
                  <div className="p-1 border border-blue-900 rounded-full bg-white text-blue-900 shadow-sm"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
                  <span>Làm sạch • Chuẩn hóa • Tổng hợp</span>
                </div>
              </div>
            </div>

            {/* Connecting Arrow 2 */}
            <div className="flex items-center justify-center w-8 shrink-0 relative mt-16">
               <div className="absolute h-1.5 bg-blue-900 w-16 z-0"></div>
               <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-blue-900 border-b-[8px] border-b-transparent absolute left-8"></div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 flex flex-col relative z-10">
              <div className="bg-blue-900 text-white rounded-t-2xl p-4 flex flex-col items-center text-center relative border border-blue-900 shadow-md">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-blue-900 text-white rounded-full flex items-center justify-center text-2xl font-bold border-4 border-white shadow-sm">3</div>
                <h3 className="font-bold text-2xl mt-4 mb-1 tracking-wide text-white">Dataset Tháng</h3>
                <p className="text-cyan-50 font-semibold text-base drop-shadow-sm">576 dòng • Baseline</p>
              </div>
              <div className="flex-1 bg-white border-2 border-blue-100 border-t-0 rounded-b-2xl p-4 flex flex-col justify-between shadow-sm">
                <div className="flex justify-around items-center h-full px-2 pt-2">
                  <div className="flex flex-col items-center relative">
                    <div className="h-16 w-16 text-blue-400/80 mb-2 relative">
                       <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full opacity-20"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/></svg>
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full absolute inset-0 text-blue-600"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                    </div>
                  </div>
                  <div className="w-px h-16 bg-gray-200"></div>
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 text-blue-900 mb-2 relative">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                      <div className="absolute inset-x-2 top-2 bottom-6 border border-blue-200 rounded flex items-center justify-center bg-blue-50/50">
                        <span className="font-mono text-[9px] font-bold text-blue-800">AI</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-700 leading-tight w-24">Dữ liệu đầu vào cho mô hình baseline</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-center gap-2 text-blue-900 font-semibold bg-gray-50/50 rounded-lg p-2 text-base z-30">
                  <div className="p-1 border border-blue-900 rounded-full bg-white text-blue-900 shadow-sm"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>
                  <span>Chuẩn bị cho mô hình AI (baseline)</span>
                </div>
              </div>
            </div>
            
          </div>

          {/* Bottom part: 3 Features horizontally */}
          <div className="grid grid-cols-3 gap-4 px-4 mt-2 mb-4">
            {slide.content?.map((item, i) => {
              const parts = item.split(':');
              const title = parts[0]?.trim();
              const desc = parts[1]?.trim();
              return (
                <div key={i} className="flex gap-4 items-center bg-orange-50/50 border border-orange-200/60 rounded-xl p-4 shadow-sm min-h-[5rem]">
                  <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center shrink-0 shadow-md">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-blue-900 mb-0.5">{title}</h4>
                    <p className="text-base text-gray-700 leading-[1.2]">{desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer removed */}
        </div>
       );

    case 'architecture':
        const layers = [
          {
            id: 4,
            title: "Tầng 4 • Presentation Layer",
            subtitle: "Mobile UI tối ưu di động • Disclaimer",
            bgColor: "bg-[#1d4ed8]", // blue-700
            icon: (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-900"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            ),
            leftText: "Đến\nngười dùng",
            items: [
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-800"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>, label: "Giao diện\nthân thiện" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-800"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>, label: "Cảnh báo &\nkhuyến nghị" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-800"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, label: "Dự báo giá\ncà phê" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-800"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: "Lịch sử\n& theo dõi" },
            ]
          },
          {
            id: 3,
            title: "Tầng 3 • AI Core Layer",
            subtitle: "FastAPI • Random Forest • Pydantic guard",
            bgColor: "bg-[#2563eb]", // blue-600
            icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-blue-900"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            ),
            leftText: "Xử lý &\ntrí tuệ",
            items: [
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-800"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, label: "FastAPI\n(Backend API)" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-800"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>, label: "Random Forest\n(Model ML)" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-800"><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="5" cy="19" r="3"/><line x1="12" y1="12" x2="5" y2="16"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="12" x2="19" y2="16"/></svg>, label: "Mô hình cây\n(Ensemble)" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-800"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>, label: "Pydantic guard\n(Validate Input)" },
            ]
          },
          {
            id: 2,
            title: "Tầng 2 • Filtering Layer",
            subtitle: "Nội suy giá trị thiếu • Khử nhiễu cảm biến lỗi",
            bgColor: "bg-[#3b82f6]", // blue-500
            icon: (
               <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-blue-900"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            ),
            leftText: "Làm sạch &\nchuẩn hóa",
            items: [
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-800"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>, label: "Lọc & làm sạch\ndữ liệu" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-800"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, label: "Khử nhiễu\ncảm biến" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-800"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><circle cx="12" cy="12" r="3"/></svg>, label: "Nội suy giá trị\nthiếu" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-800"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15L11 17L15 11"/></svg>, label: "Kiểm tra chất lượng\n& hợp lệ" },
            ]
          },
          {
            id: 1,
            title: "Tầng 1 • Data Layer",
            subtitle: "Crawler thu thập tự động giá cà phê & dữ liệu thời tiết",
            bgColor: "bg-[#60a5fa]", // blue-400
            icon: (
               <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-blue-900"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
            ),
            leftText: "Từ dữ liệu\nthô",
            items: [
              { icon: <div className="relative w-10 h-10 text-amber-800"><svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>, label: "Giá cà phê\nthô hàng ngày" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-sky-400"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5"/><path d="M8 13a4 4 0 1 0 4 4"/><path d="M8 17a4 4 0 1 0 4 4"/></svg>, label: "Dữ liệu thời tiết\nhàng ngày" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-slate-600"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>, label: "Đầu vào thô\n(raw input)" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-800"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"/><line x1="8" y1="2" x2="8" y2="22"/><line x1="16" y1="2" x2="16" y2="22"/><line x1="2" y1="8" x2="22" y2="8"/><line x1="2" y1="16" x2="22" y2="16"/></svg>, label: "Crawler thu thập\ntự động" },
            ]
          }
        ];
  
        return (
          <div className="w-full h-full p-8 flex flex-col bg-white overflow-hidden relative">
            <PPTHeader title={slide.title} />
            
            <div className="flex-1 flex px-4 gap-8 relative mt-4 h-full">
              {/* Left sidebar arrow */}
              <div className="w-32 flex flex-col items-center relative py-6">
                <div className="absolute top-0 bottom-6 w-1 bg-blue-200"></div>
                {/* Arrow head */}
                <div className="absolute top-[-10px] w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[20px] border-b-blue-600"></div>
                
                <div className="flex-1 flex flex-col justify-between w-full z-10 py-10">
                  {layers.map((layer) => (
                    <div key={layer.id} className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-full bg-white border border-blue-200 shadow-md flex items-center justify-center">
                        {layer.icon}
                      </div>
                      <div className="text-center text-[13px] font-semibold text-blue-900 whitespace-pre-line leading-tight">
                        {layer.leftText}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Main layers */}
              <div className="flex-1 flex flex-col justify-between py-6 max-w-5xl relative">
                {layers.map((layer, index) => (
                  <div key={layer.id} className="relative flex items-stretch h-36">
                    {/* Up arrow between layers */}
                    {index < layers.length - 1 && (
                       <div className="absolute -bottom-6 left-1/2 -ml-2 text-blue-600 z-20">
                         <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 4l-8 8h6v8h4v-8h6z"/></svg>
                       </div>
                    )}
  
                    {/* Left Blue Box */}
                    <div className={`w-[26rem] ${layer.bgColor} rounded-l-2xl rounded-r-none relative shadow-md p-6 pl-10 flex flex-col justify-center border border-white/20 shrink-0 z-10`}>
                       <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white text-white flex items-center justify-center text-2xl font-bold bg-transparent shadow-sm" style={{ backdropFilter: 'blur(4px)' }}>
                         {layer.id}
                       </div>
                       <h3 className="text-white font-bold text-2xl mb-1 mt-1">{layer.title}</h3>
                       <p className="text-blue-50 text-[15px] leading-tight pr-6">{layer.subtitle}</p>
                    </div>
  
                    {/* Right White Box */}
                    <div className="flex-1 bg-white rounded-r-lg border border-blue-100 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] flex items-center justify-around px-4 pr-10 z-0 mr-8 relative">
                      {layer.items.map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 w-1/4 text-center">
                          <div className="text-blue-800">
                            {item.icon}
                          </div>
                          <span className="text-[14px] font-semibold text-gray-700 whitespace-pre-line leading-tight">
                            {item.label}
                          </span>
                        </div>
                      ))}
                      
                      {/* Add Disclaimer explicitly for Layer 4, and create space for the mobile phone */}
                      {layer.id === 4 && (
                        <>
                          <div className="absolute -right-8 w-44 bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm z-10">
                            <div className="flex items-center gap-2 mb-2 text-blue-800 font-bold text-sm">
                               <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                               DISCLAIMER
                            </div>
                            <p className="text-[11px] text-slate-600 leading-tight">
                              Dự báo chỉ mang tính tham khảo, không thay thế quyết định của người trồng.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Mobile Mockup Overlay for Presentation Layer (Layer 4) */}
                <div className="absolute top-0 right-56 w-[180px] h-[360px] bg-white rounded-[2rem] border-[6px] border-gray-800 shadow-2xl z-30 flex flex-col overflow-hidden">
                   <div className="absolute top-0 w-full h-5 flex justify-center mt-1">
                     <div className="w-16 h-4 bg-gray-800 rounded-b-xl z-20"></div>
                   </div>
                   <div className="flex items-center justify-between px-4 pt-3 pb-2 text-[8px] font-bold">
                     <span>9:41</span>
                     <div className="flex gap-1 items-center">
                       <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
                     </div>
                   </div>
                   
                   <div className="px-3 pb-2 flex-col gap-1 hidden">
                   </div>
  
                   <div className="px-3 pt-2">
                     <h4 className="font-bold text-sm flex items-center gap-1">👋 Xin chào nhà nông,</h4>
                     <p className="text-[9px] text-gray-500 mb-2">Hôm nay bạn muốn làm gì?</p>
                   </div>
                   
                   <div className="flex-1 bg-slate-50 p-2 flex flex-col gap-2 overflow-y-auto w-full">
                      <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
                         <div className="p-1.5 bg-orange-50 rounded-md text-orange-600"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
                         <div>
                           <div className="text-[10px] font-bold text-gray-800">Dự báo Giá Cà Phê</div>
                           <div className="text-[7px] text-gray-400 leading-tight">Xem dự báo giá cà phê trong các tháng tới và mức độ tin cậy.</div>
                         </div>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
                         <div className="p-1.5 bg-green-50 rounded-md text-green-600"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 22C12 22 20 18 20 11C20 7.5 17.5 5 14 5C13.2 5 12.5 5.2 12 5.5C11.5 5.2 10.8 5 10 5C6.5 5 4 7.5 4 11C4 18 12 22 12 22Z"/></svg></div>
                         <div>
                           <div className="text-[10px] font-bold text-gray-800">Tư vấn Canh tác</div>
                           <div className="text-[7px] text-gray-400 leading-tight">Nhận lời khuyên chăm sóc vườn dựa trên thời tiết và loại đất.</div>
                         </div>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
                         <div className="p-1.5 bg-amber-50 rounded-md text-amber-600"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                         <div>
                           <div className="text-[10px] font-bold text-gray-800">Lịch sử Dự báo</div>
                           <div className="text-[7px] text-gray-400 leading-tight">Xem lại các dự báo và lời khuyên bạn đã lưu trước đó.</div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        );

    case 'metrics':
      return (
        <div className="w-full h-full p-16 flex flex-col bg-white">
          <PPTHeader title={slide.title} />
          
          <div className="grid grid-cols-3 gap-8 mb-12">
             {slide.metrics?.map((m, i) => (
               <div key={i} className={`text-center p-8 border-4 ${i===2 ? 'border-red-600 bg-red-50' : 'border-blue-900 bg-blue-50'} shadow-md`}>
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">{m.label}</h3>
                  <div className={`text-5xl font-extrabold mb-2 ${i===2 ? 'text-red-700' : 'text-blue-900'}`}>{m.value}</div>
                  <div className="text-xl text-gray-500 font-bold">{m.desc}</div>
               </div>
             ))}
          </div>

          <div className="bg-gray-100 p-8 border-l-8 border-blue-900 mt-auto">
             <ul className="space-y-4">
              {slide.content?.map((item, i) => (
                <li key={i} className="flex gap-4 items-start text-2xl text-gray-800">
                  <span className="text-blue-600 font-bold text-2xl shrink-0">•</span>
                  <span dangerouslySetInnerHTML={{ __html: item.replace(/^([^:]+):/g, '<b>$1:</b>') }}></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );

    case 'chart':
      return (
        <div className="w-full h-full p-16 flex flex-col bg-white">
          <PPTHeader title={slide.title} />
          
          <div className="flex-1 flex flex-col justify-center px-12 mb-8">
            <h3 className="text-3xl font-bold text-center mb-16 text-blue-900 uppercase">Mức Độ Đóng Góp Đặc Trưng (Feature Importance)</h3>
            
            <div className="space-y-12">
              {slide.chartData?.map((data, i) => (
                 <div key={i} className="flex items-center gap-6">
                   <div className="w-72 text-2xl font-bold text-right text-gray-800 leading-tight shrink-0">{data.label}</div>
                   <div className="flex-1 h-14 bg-gray-200 border border-gray-300 relative">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${data.value}%` }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.15 }}
                        className={`h-full relative flex items-center pr-4 text-white font-bold text-2xl ${
                          i === 0 ? 'bg-blue-800' : i === 1 ? 'bg-blue-600' : 'bg-blue-400'
                        } ${data.value >= 15 ? 'justify-end' : 'justify-start overflow-visible'}`}
                      >
                        <span className={data.value >= 15 ? '' : 'absolute left-full ml-4 text-gray-800'}>
                          {data.value}%
                        </span>
                     </motion.div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 p-6 mt-auto">
             <ul className="space-y-4">
              {slide.content?.map((item, i) => (
                <li key={i} className="flex gap-4 items-start text-xl text-green-900 font-bold">
                  <span className="text-green-600 text-2xl shrink-0">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: item.replace(/^([^:]+):/g, '<b>$1:</b>') }}></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );

    case 'thankyou':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-blue-950 p-16 text-center text-white relative">
          {slide.image && (
            <div className="absolute inset-0 z-0">
              <img src={slide.image} alt="Coffee Farm Background" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
            </div>
          )}
          <div className="absolute top-16 left-0 w-full text-center z-10">
            <span className="text-2xl font-bold text-blue-200 uppercase tracking-widest opacity-80">Trường Đại học Công nghệ Thông tin - ĐHQG-HCM</span>
          </div>
          <div className="z-10 flex flex-col items-center justify-center mt-12">
            <h1 className="text-6xl font-bold mb-6 tracking-wide uppercase">{slide.title}</h1>
            <hr className="w-64 border-2 border-white mb-6 opacity-50 mx-auto" />
            <h2 className="text-4xl text-blue-200 font-bold mb-16">{slide.subtitle}</h2>
            
            {slide.content?.map((item, i) => (
               <p key={i} className="text-2xl text-blue-100">{item}</p>
            ))}
          </div>
        </div>
      );

    default:
      return <div>Layout not found</div>;
  }
}
