export type Slide = {
  id: number;
  slideNumber: string;
  title: string;
  subtitle?: string;
  layout: "cover" | "profile" | "bullets" | "flow" | "architecture" | "metrics" | "chart" | "split" | "thankyou";
  content?: string[];
  leftContent?: string[];
  rightContent?: string[];
  members?: { name: string; role: string }[];
  metrics?: { label: string; value: string; desc: string }[];
  flowSteps?: string[];
  chartData?: { label: string; value: number }[];
  disclaimer?: string;
  speakerNotes: string;
};

export const slides: Slide[] = [
  {
    id: 1,
    slideNumber: "1",
    layout: "cover",
    title: "AI Hỗ Trợ Canh Tác & Dự Báo Giá Cà Phê",
    subtitle: "Đề tài DT10 - Tư duy Trí tuệ Nhân tạo (AI002)",
    content: ["Giảng viên hướng dẫn: TS. Phan Thế Duy"],
    members: [
      { name: "Đào Vĩnh Bảo Phúc", role: "Nhóm trưởng - 25730053" },
      { name: "Tăng Phước Thịnh", role: "Thành viên - 25730071" },
      { name: "Đặng Chí Thanh", role: "Thành viên - 25730063" },
      { name: "Hoàng Cao Sơn", role: "Thành viên - 25730061" }
    ],
    speakerNotes: "Xin chào Thầy và các bạn. Hôm nay Nhóm 10 xin đại diện trình bày đồ án cuối kỳ môn Tư duy Trí tuệ Nhân tạo với đề tài DT10: AI dự báo kế hoạch canh tác mùa vụ và giá cà phê cho nông dân Tây Nguyên. Trọng tâm của đồ án không nằm ở việc xây dựng mô hình Deep Learning phức tạp mà tập trung vào việc áp dụng tư duy thiết kế hệ thống AI bền vững và có trách nhiệm đến tay người nông dân nhỏ lẻ."
  },
  {
    id: 2,
    slideNumber: "1.1",
    layout: "profile",
    title: "Đào Vĩnh Bảo Phúc",
    subtitle: "Nhóm trưởng - MSSV: 25730053",
    content: [
      "Thu thập dữ liệu (Crawler).",
      "Xây dựng Web UI (Frontend).",
      "Hỗ trợ thiết kế Báo cáo & Slide.",
      "Phụ trách AI Bền vững: Trục Social Impact (Tác động xã hội)."
    ],
    speakerNotes: "Trình bày tóm tắt vai trò điều phối dự án và định hướng thiết kế giao diện Mobile-first tối ưu cho nông dân ở khu vực mạng 3G yếu."
  },
  {
    id: 3,
    slideNumber: "1.2",
    layout: "profile",
    title: "Tăng Phước Thịnh",
    subtitle: "MSSV: 25730071",
    content: [
      "Thu thập dữ liệu thời tiết (Climate Crawler).",
      "Xây dựng tài liệu nghiên cứu giá.",
      "Hỗ trợ thiết kế giao diện.",
      "Liên kết API với Web UI."
    ],
    speakerNotes: "Nhấn mạnh quá trình thu thập, đồng bộ các thông số khí hậu với chu kỳ giá cà phê và việc kết nối hệ thống xuyên suốt."
  },
  {
    id: 4,
    slideNumber: "1.3",
    layout: "profile",
    title: "Đặng Chí Thanh",
    subtitle: "MSSV: 25730063",
    content: [
      "Kỹ thuật Machine Learning (Feature Engineering, Random Forest).",
      "Phát triển Backend API bằng FastAPI.",
      "Phụ trách AI Bền vững: Trục Reliability (Tính tin cậy).",
      "Phụ trách AI Bền vững: Trục Explainability (Tính minh bạch)."
    ],
    speakerNotes: "Nêu bật quá trình thiết kế lõi AI kiểm soát mức độ quan trọng của đặc trưng (Feature Importance) và xử lý backend."
  },
  {
    id: 5,
    slideNumber: "1.4",
    layout: "profile",
    title: "Hoàng Cao Sơn",
    subtitle: "MSSV: 25730061",
    content: [
      "Đánh giá và kiểm toán dữ liệu (Real Data Audit).",
      "Viết kịch bản stress test tự động cho API.",
      "Phụ trách AI Bền vững: Trục Robustness (Kháng nhiễu).",
      "Phụ trách AI Bền vững: Trục Bias (Tính thiên lệch)."
    ],
    speakerNotes: "Tóm tắt về các phát hiện khi đánh giá độ lệch dữ liệu địa lý giữa các tỉnh và quá trình mô phỏng các kịch bản nhiễu cực đoan (Black Swan)."
  },
  {
    id: 6,
    slideNumber: "2",
    layout: "bullets",
    title: "Bối cảnh & Vấn đề Nông hộ",
    content: [
      "Biến đổi khí hậu cực đoan: Nhiệt độ tăng, lượng mưa thất thường ảnh hưởng trực tiếp năng suất.",
      "Bất đối xứng thông tin thị trường: Nông dân thiếu dữ liệu khách quan, dễ bị ép giá.",
      "Quyết định cảm tính: Việc canh tác, bán hàng phần lớn dựa dẫm kinh nghiệm truyền thống."
    ],
    speakerNotes: "Cà phê là xương sống kinh tế Tây Nguyên. Tuy nhiên, nông dân nhỏ lẻ đang kẹt giữa hai gọng kìm: một bên là thời tiết cực đoan do biến đổi khí hậu, một bên là thị trường giá cả bấp bênh. Họ thiếu công cụ hỗ trợ ra quyết định khoa học, dẫn đến việc bán non hoặc bón phân tưới nước sai thời điểm."
  },
  {
    id: 7,
    slideNumber: "3",
    layout: "bullets",
    title: "Mục tiêu & Phạm vi",
    content: [
      "Mục tiêu cốt lõi: Cung cấp công cụ dự báo giá và khuyến nghị canh tác.",
      "Định hướng thiết kế: Hiện thực hóa 5 Trụ cột AI Bền vững (Responsible AI).",
      "Phạm vi áp dụng: 5 tỉnh Tây Nguyên (2022–2025)."
    ],
    disclaimer: "Hệ thống mang tính chất tham khảo học thuật. Không thay thế tư vấn chuyên môn/thương mại.",
    speakerNotes: "Dự án hướng tới xây dựng một hệ thống AI thực tế, tập trung giải quyết bài toán của nông dân tại 5 tỉnh Tây Nguyên. Chúng tôi xác lập rõ disclaimer ngay từ đầu: AI là công cụ tham khảo hỗ trợ ra quyết định, không phải là quyết định thay cho người dân để đảm bảo tính an toàn về trách nhiệm pháp lý."
  },
  {
    id: 8,
    slideNumber: "4",
    layout: "flow",
    title: "Quy trình Xử lý Dữ liệu",
    flowSteps: [
      "Dữ liệu thô hàng ngày (Raw Daily Prices & Weather)",
      "Dataset Tuần (2520 dòng)",
      "Dataset Tháng (576 dòng, Baseline)"
    ],
    content: [
      "Giảm nhiễu: Bỏ qua biến động giá ảo trong ngày/tuần.",
      "Tính đồng bộ: Chu kỳ sinh trưởng và thời tiết tương thích theo tháng.",
      "Nguyên lý KISS: Dữ liệu nhỏ gọn, nhẹ nhàng, tối ưu tài nguyên."
    ],
    speakerNotes: "Chúng tôi crawl dữ liệu giá cà phê thực tế hàng ngày và dữ liệu thời tiết. Sau khi lọc nhiễu, chúng tôi tổng hợp thành bộ dữ liệu tháng. Chọn dữ liệu tháng giúp nắm bắt xu hướng trung hạn tốt hơn và bám sát nguyên tắc KISS (Keep It Simple, Stupid), giúp mô hình chạy nhanh và gọn nhẹ."
  },
  {
    id: 9,
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
    id: 10,
    slideNumber: "6",
    layout: "bullets",
    title: "Phương pháp Kỹ thuật & Đặc trưng",
    content: [
      "Mô hình học máy: Random Forest Regressor (Ensemble Bagging).",
      "Cyclic Encoding: Mã hóa chu kỳ tháng bằng hàm Sin/Cos (Giữ tính liền mạch T12-T1).",
      "Area-based Lags: Đặc trưng tự hồi quy được cô lập theo huyện.",
      "Mục tiêu cốt lõi: Chống rò rỉ dữ liệu (Data Leakage) chéo địa lý."
    ],
    speakerNotes: "Chúng tôi chọn Random Forest vì tính ổn định và khả năng xuất Feature Importance. Khi làm feature engineering, chúng tôi xử lý các thuộc tính trễ giá theo từng huyện riêng biệt để tránh rò rỉ dữ liệu huyện này sang huyện khác, đảm bảo tính đúng đắn về mặt thống kê."
  },
  {
    id: 11,
    slideNumber: "7",
    layout: "metrics",
    title: "Kết quả Định lượng (Tập Test 2025)",
    metrics: [
      { label: "MAE", value: "13,552", desc: "VND/kg" },
      { label: "RMSE", value: "16,754", desc: "VND/kg" },
      { label: "R²", value: "-0.9044", desc: "Âm" }
    ],
    content: [
      "Trình bày trung thực R² âm do Giới hạn Ngoại suy (Extrapolation Limit).",
      "Tập Train (2022-2024): Miền giá thấp (35k - 70k).",
      "Thực tế 2025 (Black Swan): Giá bùng nổ vượt ngưỡng 100k - 120k.",
      "Mô hình Decision Tree bị giới hạn bởi trần dữ liệu đã học (~78k)."
    ],
    speakerNotes: "Chúng tôi kiểm thử mô hình trên dữ liệu năm 2025. MAE đạt 13.5k VND/kg và R² bị âm. Chúng tôi trình bày trung thực chỉ số âm này. Nguyên nhân là năm 2025 giá cà phê thực tế tăng phi mã lên hơn 100k/kg, vượt ngoài miền dữ liệu huấn luyện 2022-2024. Mô hình cây quyết định không thể ngoại suy vượt trần tập train. Đây là giới hạn kỹ thuật quan trọng giúp chúng tôi nhận thức rõ tính tin cậy của mô hình khi gặp biến cố lớn."
  },
  {
    id: 12,
    slideNumber: "8",
    layout: "bullets",
    title: "Robustness (Kháng nhiễu)",
    content: [
      "Bảo vệ 1: Validate request ở tầng API.",
      "Pydantic schema chặn nhiệt độ, mưa, độ ẩm phi lý ngoài chuỗi hợp lệ.",
      "Bảo vệ 2: Category Guard theo model đã train.",
      "Chỉ cho phép dự đoán dựa trên các danh mục (Vùng đất, loại cà) thuộc tập huấn luyện.",
      "Trả lỗi 422 cảnh báo rõ ràng thay vì suy luận sai âm thầm."
    ],
    speakerNotes: "Trong repo hiện tại, lớp Robustness được hiện thực bằng validate ở tầng API và kiểm tra category theo model đã train. Nhóm không claim có một sanitizer riêng hay một lớp guardrails cho LLM production, vì các thành phần đó chưa có trong codebase này."
  },
  {
    id: 13,
    slideNumber: "9",
    layout: "split",
    title: "Bias & Social Impact",
    leftContent: [
      "Thiên lệch địa lý (Bias):",
      "Lâm Đồng/Kon Tum: Độ phủ 100%.",
      "Đắk Lắk/Gia Lai: Độ phủ 93%.",
      "Đắk Nông: Phủ 39.6% ➔ Luôn hiển thị cảnh báo tin cậy thấp tại vùng này."
    ],
    rightContent: [
      "Tác động xã hội (Social Impact):",
      "Giao diện tối ưu Mobile-first, tương phản cao, nút chạm kích thước lớn.",
      "Hỗ trợ xem lại lịch sử Offline (lưu qua localStorage).",
      "Neo chặt Disclaimer dưới chân trang, ngăn rủi ro quyết định sai."
    ],
    speakerNotes: "Về trục Bias, chúng tôi phát hiện dữ liệu Đắk Nông cào được rất ít (chỉ 39.6%). Do đó hệ thống sẽ cảnh báo nông dân Đắk Nông rằng độ tin cậy dự báo vùng này thấp hơn Lâm Đồng để tránh họ ra quyết định sai. Về tác động xã hội (Social Impact), chúng tôi kiểm nghiệm thực tế giao diện di động React/Vite/Tailwind kết nối backend. Giao diện được tối ưu hóa mobile-first với màn chào rõ ràng, nút lớn tương phản cao chống chói nắng, hỗ trợ lưu trữ cục bộ để xem lịch sử khi mất mạng, và đặc biệt chân trang luôn hiển thị Disclaimer bắt buộc nhằm tránh các rủi ro quyết định kinh tế sai lệch cho người nông dân."
  },
  {
    id: 14,
    slideNumber: "10",
    layout: "chart",
    title: "Transparency (Tính minh bạch)",
    chartData: [
      { label: "Đà giá TT (rolling_avg_7d)", value: 72.8 },
      { label: "Giá tháng trước (lag_1d)", value: 22.2 },
      { label: "Khí hậu ngắn hạn & Vĩ mô", value: 5.0 }
    ],
    content: [
      "AI làm sáng tỏ lý do dự báo: Đà giá lịch sử (kỳ gần) đóng vai trò quyết định chính.",
      "Ngăn chặn nhận định cảm tính (Ví dụ: Mưa đột ngột hôm nay không làm rớt ngay giá bán ngày mai)."
    ],
    speakerNotes: "Với trục Transparency, mô hình bóc tách rõ tầm ảnh hưởng của các biến. 72.8% giá trị dự báo được quyết định bởi trung bình trượt giá quá khứ gần. Điều này minh bạch hóa thuật toán, giúp nông dân hiểu rằng đà giá thị trường là yếu tố quyết định chính chứ không phải các yếu tố thời tiết ngắn hạn, giúp họ bình tĩnh phân tích thông tin."
  },
  {
    id: 15,
    slideNumber: "11",
    layout: "bullets",
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
    id: 16,
    slideNumber: "12",
    layout: "bullets",
    title: "Kết luận & Hướng Phát triển",
    content: [
      "Kết luận:",
      "Đã Vận hành thành công cấu trúc AI End-to-End.",
      "Tích hợp hiện thực thành công 5 Trụ cột AI Bền vững vào hệ thống.",
      "Trung thực báo cáo giới hạn do ngoại suy mô hình cây Quyết định.",
      "Hướng phát triển:",
      "Xây dựng theo mô hình Time-series hỗ trợ trôi xu hướng (Prophet, XGBoost v2).",
      "Tiến hành huấn luyện Localized models dành riêng cho các vi khí hậu (tiểu vùng)."
    ],
    speakerNotes: "Tóm lại, dự án DT10 đã hoàn thiện khung baseline vững chắc và tích hợp Responsible AI vào code thực tế. Trong tương lai, chúng tôi sẽ mở rộng dữ liệu và thử nghiệm các mô hình có khả năng học xu hướng tốt hơn như Prophet hay XGBoost để giải quyết triệt để bài toán ngoại suy khi thị trường biến động cực đoan."
  },
  {
    id: 17,
    slideNumber: "13",
    layout: "bullets",
    title: "Kết luận & Tài liệu Tham khảo",
    content: [
      "Nhấn mạnh:",
      "Đã nhận diện thành công các hạn chế thuật toán.",
      "Tài liệu tham khảo nổi bật:",
      "Breiman, L. (2001). Random Forests. Machine Learning.",
      "Scikit-learn: Machine Learning in Python.",
      "Microsoft Responsible AI Standard.",
      "Trang tin thị trường nông sản Việt Nam và Open-Meteo API."
    ],
    speakerNotes: "Tổng kết ngắn gọn giá trị cốt lõi nhóm đã đạt được và trích dẫn các nền tảng khoa học nhóm đã sử dụng."
  },
  {
    id: 18,
    slideNumber: "14",
    layout: "thankyou",
    title: "Xin Chân Thành Cảm Ơn!",
    subtitle: "Questions & Answers",
    content: ["Trân trọng cảm ơn TS. Phan Thế Duy và các bạn đã theo dõi báo cáo."],
    speakerNotes: "Tạm dừng, mỉm cười và chuẩn bị tinh thần trả lời câu hỏi phản biện từ hội đồng."
  }
];
