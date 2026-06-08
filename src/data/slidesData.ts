export type Slide = {
  id: number;
  slideNumber: string;
  title: string;
  subtitle?: string;
  layout: "cover" | "profile" | "bullets" | "flow" | "architecture" | "metrics" | "chart" | "split" | "thankyou" | "ui-preview" | "bias-impact";
  content?: string[];
  leftContent?: string[];
  rightContent?: string[];
  members?: { name: string; role: string }[];
  metrics?: { label: string; value: string; desc: string }[];
  flowSteps?: string[];
  chartData?: { label: string; value: number }[];
  disclaimer?: string;
  speakerNotes: string;
  image?: string;
};

export const slides: Slide[] = [
  {
    id: 1,
    slideNumber: "1",
    layout: "cover",
    title: "AI Hỗ Trợ Canh Tác & Dự Báo Giá Cà Phê",
    subtitle: "Đề tài DT10 - Tư duy Trí tuệ Nhân tạo (AI002)",
    content: ["Giảng viên hướng dẫn: TS. Phan Thế Duy"],
    image: "/cover-image.png",
    members: [
      { name: "Đặng Chí Thanh", role: "Trưởng nhóm - 25730067" },
      { name: "Hoàng Cao Sơn", role: "Thành viên - 25730061" }
    ],
    speakerNotes: "Xin chào Thầy và các bạn. Hôm nay Nhóm 10 xin đại diện trình bày đồ án cuối kỳ môn Tư duy Trí tuệ Nhân tạo với đề tài DT10: AI dự báo kế hoạch canh tác mùa vụ và giá cà phê cho nông dân Tây Nguyên. Trọng tâm của đồ án không nằm ở việc xây dựng mô hình Deep Learning phức tạp mà tập trung vào việc áp dụng tư duy thiết kế hệ thống AI bền vững và có trách nhiệm đến tay người nông dân nhỏ lẻ."
  },
  {
    id: 2,
    slideNumber: "1.1",
    layout: "profile",
    title: "Đặng Chí Thanh",
    subtitle: "Trưởng nhóm - MSSV: 25730067",
    content: [
      "Kỹ thuật Machine Learning (Preprocess dữ liệu, Feature Engineering, Random Forest Baseline).",
      "Phát triển Backend API bằng FastAPI (Định nghĩa contract API).",
      "Xây dựng Web UI (Frontend) và tích hợp liên kết API với giao diện trực quan.",
      "Phụ trách AI Bền vững: Trục Reliability (Tính tin cậy), Transparency (Minh bạch) & Social Impact."
    ],
    speakerNotes: "Nêu bật quá trình thiết kế lõi AI kiểm soát mức độ quan trọng của đặc trưng (Feature Importance), xử lý backend FastAPI và hợp đồng API, tích hợp giao diện frontend React/Vite tối ưu tác động xã hội."
  },
  {
    id: 3,
    slideNumber: "1.2",
    layout: "profile",
    title: "Hoàng Cao Sơn",
    subtitle: "MSSV: 25730061",
    content: [
      "Đánh giá và kiểm toán dữ liệu (Real Data Audit).",
      "Thu thập dữ liệu lịch sử giá & thời tiết (Crawler) và đánh giá độ phủ dữ liệu (Data Coverage).",
      "Viết kịch bản stress test tự động cho API đánh giá biên độ sai số.",
      "Phụ trách AI Bền vững: Trục Robustness (Kháng nhiễu) & Bias (Tính thiên lệch)."
    ],
    speakerNotes: "Tóm tắt về các phát hiện khi đánh giá độ lệch dữ liệu địa lý giữa các tỉnh, quy trình crawler dữ liệu và quá trình mô phỏng các kịch bản nhiễu cực đoan (Black Swan)."
  },
  {
    id: 4,
    slideNumber: "2",
    layout: "bullets",
    title: "Bối cảnh & Vấn đề Nông hộ",
    image: "/slide-06.png",
    content: [
      "Biến đổi khí hậu cực đoan: Nhiệt độ tăng, lượng mưa thất thường ảnh hưởng trực tiếp năng suất.",
      "Bất đối xứng thông tin thị trường: Nông dân thiếu dữ liệu khách quan, dễ bị ép giá.",
      "Quyết định cảm tính: Việc canh tác, bán hàng phần lớn dựa dẫm kinh nghiệm truyền thống."
    ],
    speakerNotes: "Cà phê là xương sống kinh tế Tây Nguyên. Tuy nhiên, nông dân nhỏ lẻ đang kẹt giữa hai gọng kìm: một bên là thời tiết cực đoan do biến đổi khí hậu, một bên là thị trường giá cả bấp bênh. Họ thiếu công cụ hỗ trợ ra quyết định khoa học, dẫn đến việc bán non hoặc bón phân tưới nước sai thời điểm."
  },
  {
    id: 5,
    slideNumber: "3",
    layout: "bullets",
    title: "Mục tiêu & Phạm vi",
    content: [
      "Mục tiêu cốt lõi: Cung cấp công cụ dự báo giá và khuyến nghị canh tác.",
      "Định hướng thiết kế: Hiện thực hóa 5 Trụ cột AI Bền vững (Responsible AI).",
      "Phạm vi áp dụng: 5 tỉnh Tây Nguyên (2020–2026)."
    ],
    disclaimer: "Hệ thống mang tính chất tham khảo học thuật. Không thay thế tư vấn chuyên môn/thương mại.",
    speakerNotes: "Dự án hướng tới xây dựng một hệ thống AI thực tế, tập trung giải quyết bài toán của nông dân tại 5 tỉnh Tây Nguyên. Chúng tôi xác lập rõ disclaimer ngay từ đầu: AI là công cụ tham khảo hỗ trợ ra quyết định, không phải là quyết định thay cho người dân để đảm bảo tính an toàn về trách nhiệm pháp lý."
  },
  {
    id: 6,
    slideNumber: "4",
    layout: "flow",
    title: "Quy trình Xử lý Dữ liệu",
    flowSteps: [
      "Dữ liệu thô hàng ngày (Raw Daily Prices & Weather)",
      "Dataset Tuần (3,972 dòng)",
      "Dataset Tháng (912 dòng, 18 cột, 77.96% observed)"
    ],
    content: [
      "Độ phủ dữ liệu thực tế (Observed coverage): Đạt 77.96% trên toàn bộ dataset tháng.",
      "Giảm nhiễu: Bỏ qua biến động giá ảo trong ngày/tuần.",
      "Tính đồng bộ: Chu kỳ sinh trưởng và thời tiết tương thích theo tháng.",
      "Nguyên lý KISS: Dữ liệu nhỏ gọn, nhẹ nhàng, tối ưu tài nguyên."
    ],
    speakerNotes: "Chúng tôi cào dữ liệu giá cà phê thực tế hàng ngày và dữ liệu thời tiết. Sau khi lọc nhiễu, chúng tôi tổng hợp thành bộ dữ liệu tháng với 912 dòng, 18 cột và độ phủ dữ liệu giá quan sát thực tế đạt 77.96%. Chọn dữ liệu tháng giúp nắm bắt xu hướng trung hạn tốt hơn và bám sát nguyên tắc KISS (Keep It Simple, Stupid), giúp mô hình chạy nhanh và gọn nhẹ."
  },
  {
    id: 7,
    slideNumber: "5",
    layout: "architecture",
    title: "Kiến trúc 4 Tầng",
    content: [
      "Tầng 4: Presentation Layer (Mobile UI tối ưu di động, Disclaimer).",
      "Tầng 3: AI Core Layer (FastAPI, Model Random Forest, Pydantic guard).",
      "Tầng 2: Filtering Layer (Nội suy giá trị, Khử nhiễu cảm biến lỗi).",
      "Tầng 1: Data Layer (Crawler thu thập tự động giá & thời tiết)."
    ],
    speakerNotes: "Hệ thống được cấu trúc 4 tầng rõ rệt. Điểm đặc biệt nằm ở tầng thứ 2: Filtering Layer đóng vai trò bảo vệ hệ thống khỏi dữ liệu nhiễu trước khi đưa vào mô hình AI ở tầng 3. Tầng 4 được tối ưu hóa hiển thị trực quan thông tin giải thích mô hình cho người nông dân."
  },
  {
    id: 8,
    slideNumber: "6",
    layout: "bullets",
    title: "Phương pháp Kỹ thuật & Đặc trưng",
    content: [
      "Mô hình học máy: Random Forest Regressor (Ensemble Bagging).",
      "Cyclic Encoding: Mã hóa chu kỳ tháng bằng hàm Sin/Cos (Giữ tính liền mạch T12-T1).",
      "Area-based Lags: Đặc trưng tự hồi quy được cô lập theo huyện, hiểu là kỳ trước/7 kỳ trước trong baseline monthly.",
      "Mục tiêu cốt lõi: Chống rò rỉ dữ liệu (Data Leakage) chéo địa lý."
    ],
    speakerNotes: "Chúng tôi chọn Random Forest vì tính ổn định và khả năng xuất Feature Importance. Khi làm feature engineering, chúng tôi xử lý các thuộc tính trễ giá theo từng huyện riêng biệt để tránh rò rỉ dữ liệu huyện này sang huyện khác. Các tên biến như lag_1d và lag_7d là tên kế thừa từ pipeline, trong baseline theo tháng cần hiểu là kỳ trước và 7 kỳ trước, không phải lấy lẫn dữ liệu ngày giữa các huyện."
  },
  {
    id: 9,
    slideNumber: "7",
    layout: "metrics",
    title: "Kết quả Định lượng (Tập Test 2025)",
    metrics: [
      { label: "MAE", value: "14,474", desc: "VND/kg" },
      { label: "RMSE", value: "17,874", desc: "VND/kg" },
      { label: "R²", value: "-1.2244", desc: "Âm" }
    ],
    content: [
      "Trình bày trung thực R² âm do Giới hạn Ngoại suy (Extrapolation Limit).",
      "Tập Train (2020-2024): Miền giá thấp hơn chiếm đa số trong lịch sử cũ.",
      "Thực tế 2025 (Black Swan): Giá bùng nổ vượt ngưỡng 100k - 131.5k VND/kg.",
      "Mô hình bị giới hạn bởi trần dữ liệu đã học và xu hướng kéo về trung bình quá khứ."
    ],
    speakerNotes: "Chúng tôi kiểm thử mô hình trên dữ liệu năm 2025. MAE đạt 14.5k VND/kg và R² bị âm. Chúng tôi trình bày trung thực chỉ số âm này. Nguyên nhân là năm 2025 giá cà phê thực tế tăng phi mã lên vùng 100k-131.5k VND/kg, vượt ngoài miền dữ liệu huấn luyện 2020-2024. Mô hình cây quyết định không thể ngoại suy vượt trần tập train. Đây là giới hạn kỹ thuật quan trọng giúp chúng tôi nhận thức rõ tính tin cậy của mô hình khi gặp biến cố lớn."
  },
  {
    id: 10,
    slideNumber: "8",
    layout: "bullets",
    title: "Robustness (Kháng nhiễu)",
    content: [
      "Bảo vệ 1: Validate request ở tầng API chặn dữ liệu dị thường.",
      "Bảo vệ 2: Category Guard chỉ cho phép dự báo danh mục thuộc tập train.",
      "Kết quả Stress Test: Khi có cú sốc giá cực đoan, MAE tăng 69.5%.",
      "Sốc nhiệt 45°C gần như không làm đổi sai số: MAE 14,472 VND/kg (+0.0%).",
      "Khi kết hợp sốc giá và sốc thời tiết cùng lúc, MAE tăng 69.6%.",
      "Kết luận: Hệ thống nhạy cảm với sốc giá nhưng chống chịu tốt với sốc thời tiết."
    ],
    speakerNotes: "Trong repo hiện tại, lớp Robustness được hiện thực bằng validate ở tầng API và kiểm tra category theo model đã train. Chúng tôi đã tiến hành kịch bản stress test: khi tạo sốc giá, sai số MAE bị đẩy lên +69.5%; khi tạo heat_wave 45°C, MAE gần như giữ nguyên ở 14,472 VND/kg, tức +0.0%; và khi kết hợp cả sốc giá lẫn sốc thời tiết thì MAE tăng +69.6%. Điều này chứng minh mô hình bị ảnh hưởng chủ yếu bởi biến động giá chứ không bị nhiễu do sai lệch nhỏ của thời tiết."
  },
  {
    id: 11,
    slideNumber: "9",
    layout: "bias-impact",
    title: "Bias & Social Impact",
    leftContent: [
      "Thiên lệch địa lý (Bias):",
      "Kon Tum: Độ phủ 88.2% | Lâm Đồng: 86.8%.",
      "Đắk Lắk/Gia Lai: Độ phủ trung bình 77.6%.",
      "Đắk Nông: Phủ 60.5% ➔ Luôn hiển thị cảnh báo tin cậy thấp tại vùng này.",
      "Area cần cảnh báo: Gia Nghĩa, Chư Prông, Cư M'gar, Đắk R'lấp."
    ],
    rightContent: [
      "Tác động xã hội (Social Impact):",
      "Giao diện tối ưu Mobile-first, tương phản cao, nút chạm kích thước lớn.",
      "Hỗ trợ xem lại lịch sử Offline (lưu qua localStorage).",
      "Neo chặt Disclaimer dưới chân trang, ngăn rủi ro quyết định sai."
    ],
    speakerNotes: "Về trục Bias, chúng tôi phát hiện dữ liệu Đắk Nông cào được ít hơn (chỉ 60.5%). Các area cần cảnh báo kỹ hơn gồm Gia Nghĩa, Chư Prông, Cư M'gar và Đắk R'lấp vì có nhiều proxy hoặc nội suy hơn. Do đó hệ thống sẽ cảnh báo nông dân ở các vùng dữ liệu yếu rằng độ tin cậy dự báo thấp hơn nhóm vùng có độ phủ tốt như Lâm Đồng/Kon Tum. Giao diện được tối ưu hóa mobile-first với màn chào rõ ràng, nút lớn tương phản cao chống chói nắng, hỗ trợ lưu trữ cục bộ để xem lịch sử khi mất mạng, và đặc biệt chân trang luôn hiển thị Disclaimer bắt buộc nhằm tránh các rủi ro quyết định kinh tế sai lệch cho người nông dân."
  },
  {
    id: 12,
    slideNumber: "10",
    layout: "chart",
    title: "Transparency (Tính minh bạch)",
    chartData: [
      { label: "Giá tháng trước (lag_1d)", value: 50.5 },
      { label: "Đà giá TT (rolling_avg_7d)", value: 46.9 },
      { label: "Thời tiết & Yếu tố khác", value: 2.6 }
    ],
    content: [
      "AI làm sáng tỏ lý do dự báo: Đà giá lịch sử (kỳ gần) đóng vai trò quyết định chính.",
      "Ngăn chặn nhận định cảm tính (Ví dụ: Mưa đột ngột hôm nay không làm rớt ngay giá bán ngày mai)."
    ],
    speakerNotes: "Với trục Transparency, mô hình bóc tách rõ tầm ảnh hưởng của các biến. 50.5% quyết định bởi giá tháng trước và 46.9% bởi trung bình trượt giá. Điều này minh bạch hóa thuật toán, giúp nông dân hiểu rằng đà giá thị trường là yếu tố quyết định chính chứ không phải các yếu tố thời tiết ngắn hạn, giúp họ bình tĩnh phân tích thông tin."
  },
  {
    id: 13,
    slideNumber: "11",
    layout: "ui-preview",
    title: "Giao diện Di động (Mobile UI)",
    content: [
      "Định hướng thiết kế Neo-Brutalism: Tương phản cao, phù hợp đọc dưới nắng gắt ngoài rẫy.",
      "Biệt lập tác vụ: Phân tách rõ luồng 'Dự báo Giá' và 'Khuyến nghị Canh tác'.",
      "An toàn dữ liệu: Lưu dự báo ngoại tuyến, hỗ trợ kết nối mạng 3G yếu chập chờn.",
      "Minh bạch đầu ra: Trực quan hóa mức đóng góp của đặc trưng và khuyến nghị rõ ràng."
    ],
    speakerNotes: "Chúng tôi đã hiện thực một giao diện di động bằng React. Giao diện phân tách tính năng thành các luồng độc lập, bám sát mental model của người nông dân. Ứng dụng hỗ trợ lưu trữ cục bộ để xem lại dự báo khi không có mạng, thiết kế hiện thực hoàn toàn nguyên lý Social Impact."
  },
  {
    id: 14,
    slideNumber: "12",
    layout: "bullets",
    title: "Kết luận & Hướng Phát triển",
    content: [
      "Kết luận:",
      "Đã Vận hành thành công cấu trúc AI End-to-End.",
      "Tích hợp hiện thực thành công 5 Trụ cột AI Bền vững vào hệ thống.",
      "Trung thực báo cáo giới hạn do ngoại suy mô hình cây Quyết định.",
      "Hướng phát triển:",
      "Nghiên cứu mô hình hỗ trợ xu hướng tốt hơn (Linear trend, Prophet, XGBoost v2).",
      "Tiến hành huấn luyện Localized models dành riêng cho các vi khí hậu (tiểu vùng)."
    ],
    speakerNotes: "Tóm lại, dự án DT10 đã hoàn thiện khung baseline Random Forest vững chắc và tích hợp Responsible AI vào code thực tế. Trong tương lai, chúng tôi sẽ mở rộng dữ liệu và nghiên cứu so sánh các hướng có khả năng học xu hướng tốt hơn như linear trend, Prophet hoặc XGBoost v2. Đây là hướng phát triển tương lai, chưa phải mô hình đang vận hành trong repo hiện tại."
  },
  {
    id: 15,
    slideNumber: "13",
    layout: "bullets",
    title: "Tài liệu Tham khảo",
    content: [
      "Breiman, L. (2001). Random Forests. Machine Learning. DOI: 10.1023/A:1010933404324.",
      "Pedregosa, F. et al. (2011). Scikit-learn: Machine Learning in Python. JMLR 12(85):2825-2830.",
      "Microsoft Responsible AI Standard v2 & Reference Guide.",
      "Open-Meteo Historical Weather API.",
      "Nguồn giá trong manifest: Báo Công Thương, Nông nghiệp & Môi trường, Kinh tế Đô thị, Vinanet."
    ],
    speakerNotes: "Các tài liệu tham khảo đã được kiểm tra lại theo nguồn chính thức: bài Random Forest trên Springer DOI 10.1023/A:1010933404324, bài scikit-learn trên Journal of Machine Learning Research, bộ Responsible AI Standard v2 của Microsoft, tài liệu Historical Weather API của Open-Meteo và các trang báo/cổng tin có trong source_manifest.json của crawler."
  },
  {
    id: 16,
    slideNumber: "14",
    layout: "thankyou",
    title: "Xin Chân Thành Cảm Ơn!",
    subtitle: "Questions & Answers",
    content: ["Trân trọng cảm ơn TS. Phan Thế Duy và các bạn đã theo dõi báo cáo."],
    speakerNotes: "Tạm dừng, mỉm cười và chuẩn bị tinh thần trả lời câu hỏi phản biện từ hội đồng."
  }
];
