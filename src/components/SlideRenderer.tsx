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
        <div className="w-full h-full flex flex-col justify-center bg-white p-16 relative">
          <div className="absolute top-12 left-16 right-16 flex justify-between items-center pb-4">
            <span className="text-xl font-bold text-blue-900 uppercase tracking-widest">Trường Đại học Công nghệ Thông tin - ĐHQG-HCM</span>
          </div>
          <div className="border-l-8 border-blue-900 pl-8 mb-12 mt-12">
            <h1 className="text-5xl font-bold text-blue-950 leading-tight mb-4">{slide.title}</h1>
            <h2 className="text-2xl text-blue-800 font-medium">{slide.subtitle}</h2>
            {slide.content?.map((text, i) => (
              <p key={i} className="text-xl text-gray-700 mt-4">{text}</p>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 max-w-4xl border-t border-gray-300 pt-8 mt-auto">
            {slide.members?.map((m, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-xl font-bold text-blue-900">{m.name}</span>
                <span className="text-lg text-gray-600">{m.role}</span>
              </div>
            ))}
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
        <div className="w-full h-full p-16 flex flex-col bg-white overflow-hidden">
          <PPTHeader title={slide.title} />
          
          <div className="flex-1 px-8 mt-4 overflow-y-auto">
            <ul className="space-y-8">
              {slide.content?.map((item, i) => {
                const isHeading = !item.includes(':') && (item.endsWith(':') || item.includes('Kết luận:') || item.includes('Hướng phát triển:') || item.includes('Nhấn mạnh:'));
                if (isHeading) {
                  return (
                    <li key={i} className={`flex gap-4 items-start text-3xl font-bold text-blue-900 mt-12`}>
                      <span dangerouslySetInnerHTML={{ __html: item }}></span>
                    </li>
                  )
                }
                return (
                  <li key={i} className={`flex gap-4 items-start text-2xl text-gray-800 pl-4`}>
                    <span className="text-blue-600 font-bold text-3xl leading-none shrink-0">•</span>
                    <span dangerouslySetInnerHTML={{ __html: item.replace(/^([^:]+):/g, '<b>$1:</b>') }}></span>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {slide.disclaimer && (
            <div className="mt-8 bg-gray-100 border-l-4 border-red-500 p-4 text-xl text-gray-700 italic shrink-0">
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
        <div className="w-full h-full p-16 flex flex-col bg-white">
          <PPTHeader title={slide.title} />
          
          <div className="flex justify-between items-center mt-12 mb-20 px-4">
             {slide.flowSteps?.map((step, i) => (
               <React.Fragment key={i}>
                 <div className="bg-blue-900 text-white p-6 text-center font-bold text-2xl w-1/3 shadow-md border border-blue-950 flex-1 flex items-center justify-center min-h-[120px]">
                    {step}
                 </div>
                 {i < slide.flowSteps!.length - 1 && (
                   <div className="w-16 h-2 bg-blue-900 relative shrink-0">
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 border-t-[16px] border-t-transparent border-l-[20px] border-l-blue-900 border-b-[16px] border-b-transparent"></div>
                   </div>
                 )}
               </React.Fragment>
             ))}
          </div>
          
          <div className="px-8 mt-auto py-8 bg-gray-50 border border-gray-200 shadow-inner">
            <ul className="space-y-6">
              {slide.content?.map((item, i) => (
                <li key={i} className="flex gap-4 items-start text-2xl text-gray-800">
                  <span className="text-blue-600 font-bold text-2xl shrink-0">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: item.replace(/^([^:]+):/g, '<b>$1:</b>') }}></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
       );

    case 'architecture':
        return (
          <div className="w-full h-full p-16 flex flex-col bg-white">
            <PPTHeader title={slide.title} />
            <div className="flex-1 flex flex-col justify-center px-16 gap-4">
               {slide.content?.map((layer, i) => {
                 let bgColor = "bg-blue-900 text-white";
                 if (i === 1) bgColor = "bg-blue-800 text-white";
                 if (i === 2) bgColor = "bg-blue-700 text-white";
                 if (i === 3) bgColor = "bg-blue-600 text-white";
                 
                 return (
                   <div key={i} className={`${bgColor} text-center border-2 border-white shadow-lg text-2xl font-bold flex items-center justify-center py-10 px-8 transform transition hover:scale-105`}>
                     {layer}
                   </div>
                 )
               })}
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
        <div className="w-full h-full flex flex-col items-center justify-center bg-blue-900 p-16 text-center text-white relative">
          <div className="absolute top-16 left-0 w-full text-center">
            <span className="text-2xl font-bold text-blue-200 uppercase tracking-widest opacity-80">Trường Đại học Công nghệ Thông tin - ĐHQG-HCM</span>
          </div>
          <h1 className="text-6xl font-bold mb-6 tracking-wide uppercase">{slide.title}</h1>
          <hr className="w-64 border-2 border-white mb-6 opacity-50 mx-auto" />
          <h2 className="text-4xl text-blue-200 font-bold mb-16">{slide.subtitle}</h2>
          
          {slide.content?.map((item, i) => (
             <p key={i} className="text-2xl text-blue-100">{item}</p>
          ))}
        </div>
      );

    default:
      return <div>Layout not found</div>;
  }
}
