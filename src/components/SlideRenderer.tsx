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
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-blue-900"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            ),
            leftText: "Đến\nngười dùng",
            items: [
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-800"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>, label: "Giao diện\nthân thiện" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-800"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>, label: "Cảnh báo &\nkhuyến nghị" },
              null,
              null,
            ]
          },
          {
            id: 3,
            title: "Tầng 3 • AI Core Layer",
            subtitle: "FastAPI • Random Forest • Pydantic guard",
            bgColor: "bg-[#2563eb]", // blue-600
            icon: (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-blue-900"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            ),
            leftText: "Xử lý &\ntrí tuệ",
            items: [
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-blue-800"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, label: "FastAPI\n(Backend API)" },
              { icon: <div className="w-10 h-10 flex items-center justify-center text-blue-800"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></div>, label: "Random Forest\n(Model ML)" },
              { icon: <div className="w-10 h-10 flex items-center justify-center text-blue-800"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9"><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="5" cy="19" r="3"/><line x1="12" y1="12" x2="5" y2="16"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="12" x2="19" y2="16"/></svg></div>, label: "Mô hình cây\n(Ensemble)" },
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
              { icon: <div className="w-10 h-10 flex items-center justify-center text-blue-800"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></div>, label: "Lọc & làm sạch\ndữ liệu" },
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
               <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-blue-900"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
            ),
            leftText: "Từ dữ liệu\nthô",
            items: [
              { icon: <div className="w-10 h-10 flex items-center justify-center text-amber-800"><svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>, label: "Giá cà phê\nthô hàng ngày" },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-sky-500"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5"/><path d="M8 13a4 4 0 1 0 4 4"/><path d="M8 17a4 4 0 1 0 4 4"/></svg>, label: "Dữ liệu thời tiết\nhàng ngày" },
              { icon: <div className="w-10 h-10 flex items-center justify-center text-slate-700"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg></div>, label: "Đầu vào thô\n(raw input)" },
              { icon: <div className="w-10 h-10 flex items-center justify-center text-blue-800"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"/><path d="M2 12h20"/><path d="M12 2v20"/></svg></div>, label: "Crawler thu thập\ntự động" },
            ]
          }
        ];
  
        return (
          <div className="w-full h-full p-8 flex flex-col bg-white overflow-hidden relative">
            <PPTHeader title={slide.title} />
            
            <div className="flex-1 flex flex-col justify-between py-2 relative mt-4 h-full z-10">
              {/* Left sidebar arrow vertical line */}
              <div className="absolute left-[4.5rem] top-12 bottom-12 w-[3px] bg-blue-200 z-0"></div>
              {/* Left sidebar arrow head */}
              <div className="absolute left-[4.5rem] top-8 -ml-[11px] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[18px] border-b-blue-400 z-0"></div>
              
              {layers.map((layer, index) => (
                <div key={layer.id} className="relative flex items-stretch w-full z-10 h-[6.5rem]">
                   {/* Left Column (Icon + Text) */}
                   <div className="w-36 flex flex-col items-center justify-center shrink-0 h-full relative z-10">
                      <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-white border border-blue-200 shadow-md flex items-center justify-center text-blue-900 z-10 group-hover:scale-105 transition-transform">
                        {layer.icon}
                      </div>
                      <div className="text-center text-[13px] font-bold text-blue-900 whitespace-pre-line leading-tight mt-1">
                        {layer.leftText}
                      </div>
                   </div>

                   {/* Right Section (Blue Box + White Box) */}
                   <div className="flex-1 flex items-stretch ml-2 mr-8 relative shadow-md rounded-2xl">
                      {/* Arrow connecting blue boxes */}
                      {index < layers.length - 1 && (
                         <div className="absolute -bottom-[2.25rem] left-[11.5rem] text-blue-400 z-20">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 4l-8 8h6v8h4v-8h6z"/></svg>
                         </div>
                      )}

                      {/* Blue Box */}
                      <div className={`w-[22rem] ${layer.bgColor} rounded-l-2xl p-4 pl-14 flex flex-col justify-center border border-r-0 border-white/20 shrink-0 z-10 relative`}>
                          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-[2.5px] border-white text-white flex items-center justify-center text-2xl font-bold bg-white/20 shadow-sm backdrop-blur-sm">
                            {layer.id}
                          </div>
                          <h3 className="text-white font-bold text-[22px] mb-1 drop-shadow-sm tracking-tight">{layer.title}</h3>
                          <p className="text-blue-50 text-[14px] leading-snug drop-shadow-sm pr-4 opacity-90">{layer.subtitle}</p>
                      </div>

                      {/* White Box */}
                      <div className="flex-1 bg-white/80 backdrop-blur-md rounded-r-2xl border-t border-b border-r border-blue-100 flex items-center z-10 relative">
                         {/* Content Grid */}
                         <div className="grid grid-cols-4 w-full h-full items-center px-2 pt-2">
                            {layer.items.map((item, i) => (
                               <div key={i} className="flex flex-col items-center gap-1.5 w-full text-center">
                                 {item && (
                                   <>
                                     <div className="text-blue-800">
                                       {item.icon}
                                     </div>
                                     <span className="text-[13px] font-semibold text-gray-700 whitespace-pre-line leading-[1.25]">
                                       {item.label}
                                     </span>
                                   </>
                                 )}
                               </div>
                            ))}
                         </div>

                         {/* Disclaimer for Layer 4 */}
                         {layer.id === 4 && (
                            <div className="absolute top-[8rem] left-[14rem] w-52 bg-white border border-slate-200 rounded-xl p-3 shadow-lg z-20">
                               <div className="flex items-center gap-1.5 mb-1.5 text-blue-800 font-bold text-[13px]">
                                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-600"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                                  DISCLAIMER
                               </div>
                               <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                 Dự báo chỉ mang tính tham khảo, không thay thế quyết định của người trồng.
                               </p>
                            </div>
                         )}
                      </div>
                   </div>
                </div>
              ))}

              {/* Mobile Mockup Overlay */}
              <div className="absolute -top-[1.5rem] right-[2rem] w-[16.5rem] h-[33rem] bg-white rounded-[2.5rem] border-[8px] border-slate-300 shadow-xl z-0 opacity-40 pointer-events-none flex flex-col overflow-hidden">
                 <div className="absolute top-0 w-full h-6 flex justify-center mt-1 z-40">
                   <div className="w-24 h-5 bg-slate-300 rounded-b-xl"></div>
                 </div>
                 
                 {/* Mobile Status Bar */}
                 <div className="relative z-30 bg-white flex items-center justify-between px-6 pt-5 pb-3 text-[11px] font-bold">
                   <span>9:41</span>
                   <div className="flex gap-1.5 items-center">
                     <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
                   </div>
                 </div>
                 
                 {/* Mobile Header */}
                 <div className="px-5 pt-2 relative z-30 bg-white pb-3">
                   <h4 className="font-bold text-[16px] flex items-center gap-1.5">👋 Xin chào nhà nông,</h4>
                   <p className="text-[12px] text-gray-500 mb-1">Hôm nay bạn muốn làm gì?</p>
                 </div>
                 
                 {/* Mobile Content Canvas */}
                 <div className="flex-1 bg-slate-50 p-4 flex flex-col gap-3 overflow-y-auto w-full relative z-30 border-t border-slate-100">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                       <div className="p-2.5 bg-orange-50 rounded-lg text-orange-600">
                         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                       </div>
                       <div>
                         <div className="text-[14px] font-bold text-gray-800 leading-tight mb-1">Dự báo Giá Cà Phê</div>
                         <div className="text-[11px] text-gray-500 leading-[1.3]">Xem dự báo giá ở các tháng tới, mức độ tin cậy.</div>
                       </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                       <div className="p-2.5 bg-green-50 rounded-lg text-green-600">
                         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 22C12 22 20 18 20 11C20 7.5 17.5 5 14 5C13.2 5 12.5 5.2 12 5.5C11.5 5.2 10.8 5 10 5C6.5 5 4 7.5 4 11C4 18 12 22 12 22Z"/></svg>
                       </div>
                       <div>
                         <div className="text-[14px] font-bold text-gray-800 leading-tight mb-1">Tư vấn Canh tác</div>
                         <div className="text-[11px] text-gray-500 leading-[1.3]">Nhận lời khuyên chăm sóc vườn dựa trên thời tiết.</div>
                       </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                       <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600">
                         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                       </div>
                       <div>
                         <div className="text-[14px] font-bold text-gray-800 leading-tight mb-1">Cảnh báo sâu bệnh</div>
                         <div className="text-[11px] text-gray-500 leading-[1.3]">Phòng ngừa các bệnh phổ biến mùa mưa.</div>
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

    case 'ui-preview':
      const leftFeatures = [
        {
          id: 1,
          title: "Neo-Brutalism",
          desc: "Tương phản cao, dễ đọc dưới\nnắng gắt ngoài rẫy.",
          icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[3.5rem] h-[3.5rem]"><circle cx="12" cy="12" r="10"/><path d="M12 2v20a10 10 0 0 0 0-20z" fill="currentColor"/></svg>
        },
        {
          id: 2,
          title: "Biệt lập tác vụ",
          desc: "Tách rõ luồng Dự báo Giá và\nTư vấn Canh tác.",
          icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[3.5rem] h-[3.5rem]"><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/><path d="M7 14V11a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3"/><path d="M14 8l4 4 4-4"/></svg>
        },
        {
          id: 3,
          title: "An toàn dữ liệu",
          desc: "Lưu dự báo ngoại tuyến, hỗ trợ\nmạng 3G yếu chập chờn.",
          icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[3.5rem] h-[3.5rem]"><path d="M20 16.2A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><path d="M12 12v9"/><path d="M8 17l4 4 4-4"/><ellipse cx="12" cy="19" rx="5" ry="2"/><ellipse cx="12" cy="15" rx="5" ry="2"/></svg>
        },
        {
          id: 4,
          title: "Minh bạch đầu ra",
          desc: "Hiển thị mức đóng góp đặc\ntrưng và khuyến nghị rõ ràng.",
          icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[3.5rem] h-[3.5rem]"><rect x="4" y="12" width="4" height="8"/><rect x="10" y="8" width="4" height="12"/><rect x="16" y="4" width="4" height="16"/><path d="M3 13l6-6 4 4 8-8" strokeWidth="2"/><circle cx="9" cy="7" r="2" fill="currentColor"/><circle cx="15" cy="11" r="2" fill="currentColor"/><circle cx="21" cy="3" r="2" fill="currentColor"/></svg>
        }
      ];

      return (
        <div className="w-full h-full p-8 flex flex-col bg-white overflow-hidden relative">
          <PPTHeader title={slide.title} />
          
          <div className="flex-1 flex mt-4 gap-4 relative items-center h-full">
            {/* Left Content */}
            <div className="w-[24rem] flex flex-col gap-4 shrink-0 z-10 pl-2 justify-center -translate-y-8 mb-8">
              {leftFeatures.map((f) => (
                <div key={f.id} className="relative bg-white border border-blue-200 rounded-2xl p-3 flex items-center gap-3 shadow-sm ml-4 h-[6.5rem]">
                   <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold shadow-md">
                     {f.id}
                   </div>
                   <div className="w-[4.5rem] h-full rounded-xl border border-blue-100 flex items-center justify-center shrink-0 ml-4 text-blue-900 bg-blue-50/30">
                     <div className="scale-75">{f.icon}</div>
                   </div>
                   <div className="flex-1 pr-1">
                     <h4 className="text-[18px] font-bold text-blue-900 mb-1">{f.title}</h4>
                     <p className="text-[12px] text-gray-700 leading-snug whitespace-pre-line">{f.desc}</p>
                   </div>
                </div>
              ))}
            </div>

            {/* Right UI Mockup & Callouts */}
            <div className="flex-1 flex justify-center relative translate-y-[-1.5rem] z-20">
               
               <div className="relative flex justify-center w-[20rem] shrink-0 scale-[0.82] lg:scale-[0.88] xl:scale-[0.88] 2xl:scale-100 origin-[left_top] ml-8 mt-2">
                  {/* Left Callouts */}
                  <div className="absolute top-[8rem] -left-[14.5rem] flex items-center gap-0 z-20">
                     <div className="bg-white border border-blue-200 rounded-xl p-3 shadow-md flex flex-col w-[12.5rem]">
                        <div className="flex items-center gap-2 mb-1.5 text-blue-600">
                           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[1.2rem] h-[1.2rem]"><path d="M14 6l-4 4-1-1m8-5v22m-10-8H2v-6h4"/></svg>
                           <span className="font-bold text-blue-900 text-[15px]">Nút chạm lớn</span>
                        </div>
                        <p className="text-[12px] text-gray-600 leading-snug">Khu vực chạm rộng, dễ sử dụng ngoài hiện trường.</p>
                     </div>
                     <div className="w-[2.5rem] h-[2px] bg-blue-400"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  </div>

                  <div className="absolute top-[23.5rem] -left-[14.5rem] flex items-center gap-0 z-20">
                     <div className="bg-white border border-blue-200 rounded-xl p-3 shadow-md flex flex-col w-[12.5rem]">
                        <div className="flex items-center gap-2 mb-1.5 text-blue-600">
                           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[1.2rem] h-[1.2rem]"><path d="M2.5 8.5L12 3l9.5 5.5M12 3v18M2.5 15.5l9.5 5.5m0-11l9.5-5.5"/></svg>
                           <span className="font-bold text-blue-900 text-[15px]">Lịch sử Offline</span>
                        </div>
                        <p className="text-[12px] text-gray-600 leading-snug">Xem lại dự báo và khuyến nghị ngay cả khi không có mạng.</p>
                     </div>
                     <div className="w-[2.5rem] h-[2px] bg-blue-400"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  </div>
                  
                  {/* Right Callouts */}
                  <div className="absolute top-[4rem] -right-[15rem] flex items-center flex-row-reverse gap-0 z-20">
                     <div className="bg-white border border-blue-200 rounded-xl p-3 shadow-md flex gap-3 items-center w-[13.5rem]">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg text-white flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>
                        </div>
                        <div>
                           <span className="font-bold text-blue-900 text-[15px] block mb-0.5">Mobile-first</span>
                           <p className="text-[11px] text-gray-600 leading-tight">Thiết kế tối ưu cho điện thoại và dùng tốt trên 3G yếu.</p>
                        </div>
                     </div>
                     <div className="w-[2rem] h-[2px] bg-blue-400"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  </div>

                  <div className="absolute top-[13.5rem] -right-[16.5rem] flex items-center flex-row-reverse gap-0 z-20">
                     <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-md flex flex-col w-[15.5rem]">
                        <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
                           <span className="font-bold text-gray-700 text-[12px] flex items-center gap-1.5"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[1.2rem] h-[1.2rem] text-orange-500"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> Dự báo Giá Cà Phê</span>
                           <span className="text-gray-400 text-[10px]">Xem chi tiết &gt;</span>
                        </div>
                        <div className="flex justify-between items-end">
                           <div className="text-green-600 font-bold text-xl">146.5 <span className="text-gray-500 text-[10px] font-normal">nghìn đ/kg</span></div>
                           <div className="text-green-600 font-bold text-[12px] flex flex-col items-end gap-0.5 leading-tight text-right">+2.8% ↗<span className="text-[9px] text-gray-400 font-normal">So với tháng trước</span></div>
                        </div>
                     </div>
                     <div className="w-4 h-[2px] bg-blue-400"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  </div>
                  
                  <div className="absolute top-[21rem] -right-[16.5rem] flex items-center flex-row-reverse gap-0 z-20">
                     <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-md flex flex-col w-[15.5rem]">
                        <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
                           <span className="font-bold text-gray-700 text-[12px] flex items-center gap-1.5"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[1rem] h-[1rem] text-green-500"><path d="M12 22C12 22 20 18 20 11C20 7.5 17.5 5 14 5C13.2 5 12.5 5.2 12 5.5C11.5 5.2 10.8 5 10 5C6.5 5 4 7.5 4 11C4 18 12 22 12 22Z"/></svg> Khuyến nghị hôm nay</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                            </div>
                            <div>
                               <div className="text-gray-800 font-bold text-[12px] mb-0.5">Tưới nhẹ buổi sáng</div>
                               <div className="text-gray-500 text-[10px]">25–31°C • Độ ẩm 68%</div>
                            </div>
                        </div>
                     </div>
                     <div className="w-4 h-[2px] bg-blue-400"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  </div>

                  <div className="absolute top-[28.5rem] -right-[14rem] flex items-center flex-row-reverse gap-0 z-20">
                     <div className="bg-white border border-blue-200 rounded-xl p-3 shadow-md flex gap-3 items-center w-[12.5rem]">
                        <div className="w-9 h-9 flex items-center justify-center shrink-0 text-blue-900 bg-blue-50 rounded-lg">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <div>
                           <span className="font-bold text-blue-900 text-[13px] block mb-0.5">Disclaimer rõ ràng</span>
                           <p className="text-[10px] text-gray-600 leading-tight">Thông báo cố định an toàn, luôn hiển thị ở cuối màn hình.</p>
                        </div>
                     </div>
                     <div className="w-[2rem] h-[2px] bg-blue-400"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  </div>

                  {/* Mobile Phone Box */}
                  <div className="w-[19rem] h-[39rem] flex-shrink-0 bg-[#fdfbf7] rounded-[3rem] border-[10px] border-[#333] shadow-2xl flex flex-col overflow-hidden relative isolate z-10 pb-[2rem]">
                     {/* Dynamic Island */}
                     <div className="absolute top-0 w-full h-7 flex justify-center z-40">
                       <div className="w-24 h-6 bg-[#333] rounded-b-2xl"></div>
                     </div>
                     
                     <div className="px-5 pt-8 pb-3 bg-[#fdfbf7] z-10 flex flex-col gap-4">
                       {/* App Header (AI Trợ Lý Cà Phê) */}
                       <div className="flex items-center gap-1.5 font-bold text-gray-800 text-[13px]">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[1.2rem] h-[1.2rem]"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/></svg>
                          AI Trợ Lý Cà Phê
                       </div>
                       
                       {/* Xin chào nhà nông */}
                       <div>
                         <h2 className="text-[20px] font-extrabold text-gray-900 leading-tight">Xin chào nhà nông,</h2>
                         <p className="text-[12px] text-gray-600 mt-0.5">Hôm nay bạn muốn làm gì?</p>
                       </div>
                     </div>

                     {/* Cards container */}
                     <div className="flex-1 flex flex-col gap-3 px-4 z-10 overflow-y-auto pt-2 pb-6">
                        {/* Dự báo Giá Cà Phê */}
                        <div className="bg-white rounded-[1rem] p-3 shadow-sm border border-gray-100 flex flex-col gap-2">
                           <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center border border-orange-100">
                             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                           </div>
                           <div>
                              <div className="text-[15px] font-bold text-gray-900">Dự báo Giá Cà Phê</div>
                              <div className="text-[11px] text-gray-600 mt-1 leading-[1.35]">Xem dự báo giá cà phê trong các tháng tới và mức độ tin cậy.</div>
                           </div>
                        </div>
                        
                        {/* Tư vấn Canh tác */}
                        <div className="bg-white rounded-[1rem] p-3 shadow-sm border border-gray-100 flex flex-col gap-2">
                           <div className="w-9 h-9 rounded-xl bg-green-50 text-green-700 flex items-center justify-center border border-green-100">
                             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M12 22C12 22 20 18 20 11C20 7.5 17.5 5 14 5C13.2 5 12.5 5.2 12 5.5C11.5 5.2 10.8 5 10 5C6.5 5 4 7.5 4 11C4 18 12 22 12 22Z"/></svg>
                           </div>
                           <div>
                              <div className="text-[15px] font-bold text-gray-900">Tư vấn Canh tác</div>
                              <div className="text-[11px] text-gray-600 mt-1 leading-[1.35]">Nhận lời khuyên chăm sóc vườn dựa trên thời tiết và loại đất.</div>
                           </div>
                        </div>

                        {/* Lịch sử Dự báo */}
                        <div className="bg-white rounded-[1rem] p-3 shadow-sm border border-gray-100 flex flex-col gap-2">
                           <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
                             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                           </div>
                           <div>
                              <div className="text-[15px] font-bold text-gray-900">Lịch sử Dự báo</div>
                              <div className="text-[11px] text-gray-600 mt-1 leading-[1.35]">Xem lại các dự báo và lời khuyên bạn đã lưu trước đó.</div>
                           </div>
                        </div>
                     </div>
                     
                     {/* Mockup footer disclaimer */}
                     <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-4 z-10 w-full flex justify-center bg-gradient-to-t from-[#fdfbf7] via-[#fdfbf7] to-transparent">
                        <div className="bg-orange-50 border border-orange-200 rounded-[0.5rem] p-2 flex items-start gap-1.5 w-full">
                           <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-[1px]"><path d="M12 2L1 21h22M12 6l7 12H5M12 16h.01M12 10v4" stroke="currentColor" strokeWidth="2"/></svg>
                           <div className="text-[8px] text-orange-800 font-medium leading-[1.3]">
                             Dự báo chỉ mang tính tham khảo, không thay thế quyết định của người trồng.
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Disclaimer Banner */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-[#faefdf] border border-orange-200 px-6 py-2 rounded-xl flex items-center gap-3 z-30 shadow-sm w-max mb-1">
               <div className="w-6 h-6 rounded-md bg-orange-700 text-white flex items-center justify-center font-bold shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4"><polyline points="20 6 9 17 4 12"/></svg>
               </div>
               <span className="text-orange-900 font-bold text-[14px] leading-tight">
                  Dự báo chỉ mang tính tham khảo, không thay thế quyết định của người trồng.
               </span>
            </div>

          </div>
        </div>
      );

    case 'bias-impact':
      return (
        <div className="w-full h-full p-8 px-12 flex flex-col bg-white overflow-hidden relative">
          <PPTHeader title={slide.title} />

          <div className="flex-1 flex mt-2 gap-12 relative items-stretch h-full">
            {/* Divider line in middle */}
            <div className="absolute left-[48%] top-0 bottom-8 w-[1px] border-l-2 border-dashed border-gray-200"></div>

            {/* Left Box: Bias */}
            <div className="flex-1 pr-6 flex flex-col relative h-full">
               {/* Left Title */}
               <div className="flex flex-col relative w-max mb-2">
                 <h3 className="text-blue-800 font-bold text-2xl mb-1.5 flex items-center gap-2">Thiên lệch địa lý (Bias)</h3>
                 <div className="h-[3px] bg-blue-800 w-full rounded-full flex items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-800 absolute right-[-4px]"></div>
                 </div>
               </div>

                <div className="flex-1 flex relative">
                   {/* Map Area */}
                   <div className="flex-1 relative flex items-start justify-center p-0 pt-0">
                      <div className="relative w-full h-[28rem] flex items-center justify-center">
                         <img 
                           src="/map-bias.png" 
                           alt="Bản đồ thiên lệch dữ liệu" 
                           className="max-w-[110%] w-full h-full object-contain drop-shadow-sm transition-transform hover:scale-[1.02] origin-top -translate-x-4"
                           onError={(e) => {
                             (e.target as HTMLImageElement).src = "https://placehold.co/400x500/e2e8f0/1e293b?text=Upload+map-bias.png%0Ato+public+folder";
                           }}
                         />
                      </div>
                   </div>

                   {/* Right Legend Area */}
                   <div className="w-[14.5rem] flex flex-col gap-6 justify-start relative pt-4">
                      {/* Legend Box */}
                      <div className="border border-blue-200 rounded-xl p-4 shadow-sm bg-white">
                         <h4 className="text-blue-800 font-bold text-[13px] text-center mb-3 pb-3 border-b border-gray-100">Chú giải độ phủ dữ liệu</h4>
                         <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                               <div className="w-5 h-5 rounded-full bg-[#4caf50] border border-green-600 shadow-sm shrink-0"></div>
                               <div className="flex flex-col">
                                 <span className="text-[13px] font-bold text-gray-800 leading-tight">Cao</span>
                                 <span className="text-[11px] text-gray-500 mt-0.5">≥ 90%</span>
                               </div>
                            </div>
                            <div className="flex items-center gap-3">
                               <div className="w-5 h-5 rounded-full bg-[#2196f3] border border-blue-700 shadow-sm shrink-0"></div>
                               <div className="flex flex-col">
                                 <span className="text-[13px] font-bold text-gray-800 leading-tight">Trung bình</span>
                                 <span className="text-[11px] text-gray-500 mt-0.5">70% – 89%</span>
                               </div>
                            </div>
                            <div className="flex items-center gap-3">
                               <div className="w-5 h-5 rounded-full bg-[#ff9800] border border-orange-700 shadow-sm shrink-0"></div>
                               <div className="flex flex-col">
                                 <span className="text-[13px] font-bold text-gray-800 leading-tight">Thấp</span>
                                 <span className="text-[11px] text-gray-500 mt-0.5">&lt; 70%</span>
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* Warning Box */}
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 shadow-md flex items-start gap-2 relative">
                         <div className="shrink-0 mt-0.5 relative flex items-center justify-center">
                           <div className="absolute inset-0 bg-orange-200 rounded-full blur-md opacity-60"></div>
                           <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-orange-500 relative z-10"><path d="M12 2L1 21h22M12 6l7 12H5M12 16h.01M12 10v4" stroke="white" strokeWidth="1"/></svg>
                         </div>
                         <div className="text-[11.5px] text-gray-800 leading-[1.4] text-justify mt-0.5 pr-1">
                            Đắk Nông có độ phủ thấp nên hệ thống luôn hiển thị <span className="font-bold text-orange-600">cảnh báo độ tin cậy thấp</span> tại khu vực này.
                         </div>
                      </div>
                   </div>
                </div>
            </div>

            {/* Right Box: Social Impact */}
            <div className="flex-1 pl-12 flex flex-col relative h-full">
               {/* Right Title (Centered) */}
               <div className="flex flex-col relative w-max mx-auto mb-2 pr-12">
                 <h3 className="text-green-700 font-bold text-2xl mb-1.5 align-center text-center">Tác động xã hội (Social Impact)</h3>
                 <div className="h-[3px] bg-green-700 w-full rounded-full flex items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-700 absolute right-[-4px]"></div>
                 </div>
               </div>

                {/* Mobile UI mockup with Callouts */}
                <div className="flex-1 flex justify-center relative mt-0">
                   
                   <div className="relative flex justify-center w-[16rem] shrink-0 scale-[0.74] lg:scale-[0.78] xl:scale-[0.84] origin-top ml-4 pt-0">
                      {/* Left Callouts */}
                      <div className="absolute top-[4rem] -left-[11rem] flex items-center gap-0 z-20">
                         <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 shadow-sm flex flex-col gap-1 w-[11.5rem]">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-7 h-7 rounded shrink-0 text-blue-700 border border-blue-600 flex items-center justify-center bg-white"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/></svg></div>
                              <span className="font-bold text-blue-900 text-[13px]">Mobile-first</span>
                            </div>
                            <div className="text-gray-700 text-[11.5px] leading-snug pl-1">Tối ưu cho điện thoại.</div>
                         </div>
                         <div className="w-[2rem] h-[1px] border-b border-dashed border-blue-400"></div>
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                      </div>

                      <div className="absolute top-[16rem] -left-[11rem] flex items-center gap-0 z-20">
                         <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 shadow-sm flex flex-col gap-1 w-[11.5rem]">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-7 h-7 rounded shrink-0 border border-blue-600 text-blue-700 flex items-center justify-center bg-white"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M14 6l-4 4-1-1m8-5v22m-10-8H2v-6h4"/></svg></div>
                              <span className="font-bold text-blue-900 text-[13px]">Nút chạm lớn</span>
                            </div>
                            <div className="text-gray-700 text-[11.5px] leading-snug pl-1">Dễ thao tác ngoài thực địa.</div>
                         </div>
                         <div className="w-[2rem] h-[1px] border-b border-dashed border-blue-400"></div>
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                      </div>

                      {/* Right Callouts */}
                      <div className="absolute top-[6rem] -right-[11rem] flex items-center flex-row-reverse gap-0 z-20">
                         <div className="bg-green-50 border border-green-200 rounded-xl p-3 shadow-sm flex flex-col gap-1 w-[11.5rem]">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-7 h-7 rounded shrink-0 border border-green-600 text-green-700 flex items-center justify-center bg-white border-[1.5px]"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"/><line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2"/></svg></div>
                              <span className="font-bold text-gray-900 text-[13px]">Lịch sử Offline</span>
                            </div>
                            <div className="text-gray-700 text-[11.5px] leading-snug pl-1">Lưu qua localStorage.</div>
                         </div>
                         <div className="w-[2.5rem] h-[1px] border-b border-dashed border-green-500"></div>
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      </div>

                      <div className="absolute top-[18rem] -right-[11rem] flex items-center flex-row-reverse gap-0 z-20">
                         <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 shadow-sm flex flex-col gap-1 w-[11.5rem]">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-7 h-7 rounded shrink-0 border border-orange-500 text-orange-600 flex items-center justify-center bg-white"><svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 15h2v2h-2v-2zm0-8h2v6h-2V8z"/></svg></div>
                              <span className="font-bold text-gray-900 text-[13px]">Disclaimer</span>
                            </div>
                            <div className="text-gray-700 text-[11.5px] leading-snug pl-1">Luôn hiển thị để giảm rủi ro quyết định sai.</div>
                         </div>
                         <div className="w-[2.5rem] h-[1px] border-b border-dashed border-orange-500"></div>
                         <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                      </div>


                      {/* Mobile mockup frame */}
                      <div className="w-[18rem] h-[37rem] flex-shrink-0 bg-[#f7f2ea] rounded-[3rem] border-[10px] border-[#333] shadow-2xl flex flex-col overflow-hidden relative isolate z-10 pb-[2rem]">
                         {/* Dynamic Island */}
                         <div className="absolute top-0 w-full h-7 flex justify-center z-40">
                           <div className="w-24 h-6 bg-[#333] rounded-b-2xl"></div>
                         </div>
                         
                         <div className="px-5 pt-8 pb-3 bg-[#f7f2ea] z-10 flex flex-col gap-4">
                           {/* App Header (AI Trợ Lý Cà Phê) */}
                           <div className="flex items-center gap-1.5 font-bold text-gray-800 text-[13px]">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[1.2rem] h-[1.2rem] text-orange-800"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/></svg>
                              AI Trợ Lý Cà Phê
                           </div>
                           
                           {/* Xin chào nhà nông */}
                           <div>
                             <h2 className="text-[20px] font-extrabold text-gray-900 leading-tight">Xin chào nhà nông,</h2>
                             <p className="text-[12px] text-gray-600 mt-0.5">Hôm nay bạn muốn làm gì?</p>
                           </div>
                         </div>

                         {/* Cards container */}
                         <div className="flex-1 flex flex-col gap-3 px-4 z-10 overflow-y-auto pt-2 pb-6">
                            {/* Dự báo Giá Cà Phê */}
                            <div className="bg-white rounded-[1rem] p-3 shadow-sm border border-gray-100 flex flex-col gap-2">
                               <div className="w-10 h-10 rounded-xl bg-[#f5efe6] text-[#985336] flex items-center justify-center border border-[#e8dccb]">
                                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>
                               </div>
                               <div>
                                  <div className="text-[15px] font-bold text-gray-900">Dự báo Giá Cà Phê</div>
                                  <div className="text-[11px] text-gray-600 mt-1 leading-[1.35]">Xem dự báo giá cà phê trong các tháng tới và mức độ tin cậy.</div>
                               </div>
                            </div>
                            
                            {/* Tư vấn Canh tác */}
                            <div className="bg-white rounded-[1rem] p-3 shadow-sm border border-gray-100 flex flex-col gap-2">
                               <div className="w-10 h-10 rounded-xl bg-[#edf6f0] text-[#1f8745] flex items-center justify-center border border-[#d2ecd9]">
                                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M12 22C12 22 20 18 20 11C20 7.5 17.5 5 14 5C13.2 5 12.5 5.2 12 5.5C11.5 5.2 10.8 5 10 5C6.5 5 4 7.5 4 11C4 18 12 22 12 22Z"/><path d="M12 22V12"/><path d="M12 12L16 8"/></svg>
                               </div>
                               <div>
                                  <div className="text-[15px] font-bold text-gray-900">Tư vấn Canh tác</div>
                                  <div className="text-[11px] text-gray-600 mt-1 leading-[1.35]">Nhận lời khuyên chăm sóc vườn dựa trên thời tiết và loại đất.</div>
                               </div>
                            </div>

                            {/* Lịch sử Dự báo */}
                            <div className="bg-white rounded-[1rem] p-3 shadow-sm border border-gray-100 flex flex-col gap-2">
                               <div className="w-10 h-10 rounded-xl bg-[#f5efe6] text-[#985336] flex items-center justify-center border border-[#e8dccb]">
                                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                               </div>
                               <div>
                                  <div className="text-[15px] font-bold text-gray-900">Lịch sử Dự báo</div>
                                  <div className="text-[11px] text-gray-600 mt-1 leading-[1.35]">Xem lại các dự báo và lời khuyên bạn đã lưu trước đó.</div>
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* Disclaimer Banner below mobile overlaying it */}
                      <div className="absolute -bottom-[2.5rem] left-1/2 -translate-x-1/2 w-max max-w-[28rem] bg-[#fdf5e6] border border-orange-200 px-6 py-3 rounded-xl flex items-center gap-3 z-30 shadow-md">
                         <div className="w-8 h-8 rounded-md bg-orange-500 text-white flex items-center justify-center font-bold shrink-0">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-5 h-5"><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                         </div>
                         <span className="text-gray-800 font-bold text-[14px] leading-snug">
                            Dự báo chỉ mang tính tham khảo,<br/>không thay thế quyết định của người trồng.
                         </span>
                      </div>
                   </div>

                </div>
            </div>
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
