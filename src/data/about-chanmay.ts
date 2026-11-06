export type Leader = {
  name: string;
  roleKey: string;
  group: "hdqt" | "bld" | "bks";
  titleVi: string;
  titleEn: string;
  notesVi?: string;
  notesEn?: string;
};

export type HistoryMilestone = {
  date: string;
  year: number;
  titleVi: string;
  titleEn: string;
  contentVi: string;
  contentEn: string;
};

export type OrgDepartment = {
  id: string;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
  staffHint?: string;
};

export type StrategicGoal = {
  id: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  iconName: string;
};

export const chanMayAboutData = {
  overview: {
    titleVi: "Cảng Biển Nước Sâu Đầu Mối Loại 1 & Cửa Ngõ EWEC",
    titleEn: "National Class-1 Deep-Water Seaport & Gateway of EWEC",
    introVi:
      "Cảng Chân Mây là cảng biển tổng hợp đầu mối loại 1 của Việt Nam, đồng thời là một trong 46 cảng biển được Hiệp hội Du thuyền châu Á (Asia Cruise Association) lựa chọn xây dựng điểm dừng chân cho các du thuyền quốc tế tại khu vực Đông Nam Á. Tọa lạc tại vị trí trung tâm miền Trung giữa hai đô thị lớn Huế và Đà Nẵng, cảng giữ vị thế cửa ngõ hướng biển thuận lợi nhất trên Hành lang Kinh tế Đông – Tây (EWEC), kết nối thông suốt miền Trung Việt Nam với Lào, Thái Lan và Myanmar.",
    introEn:
      "Chan May Port is a National Class-1 general seaport and one of 46 designated cruise stopovers chosen by the Asia Cruise Association in Southeast Asia. Located in Central Vietnam between Hue and Da Nang, the port serves as the most strategic maritime gateway along the East–West Economic Corridor (EWEC), connecting Central Vietnam seamlessly with Laos, Thailand, and Myanmar.",
    keyMetrics: [
      { value: "Loại 1", labelVi: "Phân cấp cảng biển quốc gia", labelEn: "National Seaport Class" },
      { value: "760 m", labelVi: "Tổng chiều dài 2 cầu bến hiện hữu", labelEn: "Total Current Quay Length" },
      { value: "-12,5 m", labelVi: "Độ sâu mớn nước luồng tàu", labelEn: "Current Channel Draft" },
      { value: "50.000 DWT", labelVi: "Cỡ tàu hàng tiếp nhận an toàn", labelEn: "Max Cargo Vessel Size" },
    ],
  },

  leaders: [
    // Hội đồng quản trị
    {
      name: "Nguyễn Tiến Đạt",
      roleKey: "chairman",
      group: "hdqt",
      titleVi: "Chủ tịch Hội đồng Quản trị",
      titleEn: "Chairman of the Board of Directors",
      notesVi: "Phó Tổng Giám đốc Tổng công ty Công nghiệp tàu thủy (SBIC)",
      notesEn: "Vice President of Shipbuilding Industry Corporation (SBIC)",
    },
    {
      name: "Huỳnh Văn Toàn",
      roleKey: "director_board",
      group: "hdqt",
      titleVi: "Thành viên HĐQT kiêm Tổng Giám đốc",
      titleEn: "Board Member & General Director",
    },
    {
      name: "Lê Chí Phai",
      roleKey: "vice_director_board",
      group: "hdqt",
      titleVi: "Thành viên HĐQT kiêm Phó Tổng Giám đốc",
      titleEn: "Board Member & Deputy General Director",
      notesVi: "Phó Bí thư Đảng ủy Công ty",
      notesEn: "Deputy Secretary of Party Committee",
    },

    // Ban Tổng Giám đốc
    {
      name: "Huỳnh Văn Toàn",
      roleKey: "general_director",
      group: "bld",
      titleVi: "Tổng Giám đốc",
      titleEn: "General Director",
      notesVi: "Điều hành chung toàn bộ hoạt động SXKD",
      notesEn: "Chief Executive Officer & Overall Port Operations",
    },
    {
      name: "Lê Chí Phai",
      roleKey: "deputy_gd_1",
      group: "bld",
      titleVi: "Phó Tổng Giám đốc",
      titleEn: "Deputy General Director",
    },
    {
      name: "Trần Văn Phong",
      roleKey: "deputy_gd_2",
      group: "bld",
      titleVi: "Phó Tổng Giám đốc",
      titleEn: "Deputy General Director",
    },
    {
      name: "Nguyễn Thành Công",
      roleKey: "deputy_gd_business",
      group: "bld",
      titleVi: "Phó Tổng Giám đốc",
      titleEn: "Deputy General Director",
      notesVi: "Phụ trách Kinh doanh, Khai thác hàng hóa & Khách hàng",
      notesEn: "In charge of Commercial, Cargo Operations & Clients",
    },
    {
      name: "Nguyễn Văn Chương",
      roleKey: "deputy_gd_dispatch",
      group: "bld",
      titleVi: "Phó Tổng Giám đốc",
      titleEn: "Deputy General Director",
      notesVi: "Phụ trách Điều độ, Dịch vụ bến cảng & An toàn",
      notesEn: "In charge of Vessel Dispatch, Terminal Services & Safety",
    },
    {
      name: "Hồ Hoàng Thi",
      roleKey: "deputy_gd_finance",
      group: "bld",
      titleVi: "Phó Tổng Giám đốc",
      titleEn: "Deputy General Director",
      notesVi: "Phụ trách Tài chính – Kế toán & Quản trị vốn",
      notesEn: "In charge of Finance, Accounting & Capital Management",
    },
    {
      name: "Ngô Khánh Toàn",
      roleKey: "chief_accountant",
      group: "bld",
      titleVi: "Kế toán trưởng",
      titleEn: "Chief Accountant",
      notesVi: "Kiểm soát tài chính & Chế độ hạch toán",
      notesEn: "Financial Control & Corporate Accounting",
    },

    // Ban Kiểm soát
    {
      name: "Phan Tuấn Anh",
      roleKey: "supervisor_head",
      group: "bks",
      titleVi: "Trưởng Ban Kiểm soát",
      titleEn: "Head of Supervisory Board",
    },
    {
      name: "Đoàn Quang Vũ",
      roleKey: "supervisor_member_1",
      group: "bks",
      titleVi: "Thành viên Ban Kiểm soát",
      titleEn: "Supervisory Board Member",
    },
    {
      name: "Nguyễn Công Định",
      roleKey: "supervisor_member_2",
      group: "bks",
      titleVi: "Thành viên Ban Kiểm soát",
      titleEn: "Supervisory Board Member",
    },
  ] as Leader[],

  milestones: [
    {
      date: "24/03/1996",
      year: 1996,
      titleVi: "Thủ tướng Võ Văn Kiệt thị sát vịnh Chân Mây",
      titleEn: "Prime Minister Vo Van Kiet inspects Chan May Bay",
      contentVi:
        "Thủ tướng Võ Văn Kiệt trực tiếp thị sát vịnh Chân Mây và làm việc với lãnh đạo tỉnh Thừa Thiên Huế, mở đường cho chủ trương phát triển cảng nước sâu.",
      contentEn:
        "Prime Minister Vo Van Kiet personally inspected Chan May Bay, initiating the strategy to establish a central deep-sea port.",
    },
    {
      date: "27/12/1996",
      year: 1996,
      titleVi: "Phê duyệt định hướng quy hoạch đô thị mới Chân Mây",
      titleEn: "Approval of Chan May New Urban Master Plan",
      contentVi:
        "Thủ tướng Chính phủ ban hành Quyết định số 966/TTg phê duyệt định hướng quy hoạch tổng thể phát triển đô thị - công nghiệp - cảng biển Chân Mây.",
      contentEn:
        "Decision No. 966/TTg officially approved the master plan for Chan May urban, industrial and seaport economic development.",
    },
    {
      date: "25/03/2001",
      year: 2001,
      titleVi: "Khởi công xây dựng Bến số 1 Cảng Chân Mây",
      titleEn: "Groundbreaking Ceremony for Berth No. 1",
      contentVi:
        "Chính thức động thổ xây dựng công trình cầu bến đầu tiên, khởi đầu sứ mệnh đưa Chân Mây thành thương cảng nước sâu quốc tế.",
      contentEn:
        "Official groundbreaking of Berth No. 1, embarking on the mission to turn Chan May into an international deep-water port.",
    },
    {
      date: "19/05/2003",
      year: 2003,
      titleVi: "Khánh thành Bến số 1 Cảng Chân Mây",
      titleEn: "Grand Opening of Berth No. 1",
      contentVi:
        "Công trình Bến số 1 chính thức khánh thành và đi vào vận hành đúng ngày kỷ niệm sinh nhật Bác Hồ, đón những chuyến tàu chở hàng đầu tiên.",
      contentEn:
        "Inauguration of Berth No. 1, welcoming the first commercial cargo vessels to Chan May Port.",
    },
    {
      date: "05/01/2006",
      year: 2006,
      titleVi: "Thành lập Khu kinh tế Chân Mây – Lăng Cô",
      titleEn: "Establishment of Chan May - Lang Co Economic Zone",
      contentVi:
        "Thủ tướng Chính phủ ban hành Quyết định số 04/2006/QĐ-TTg thành lập KKT Chân Mây – Lăng Cô với cơ chế ưu đãi đầu tư trọng điểm quốc gia.",
      contentEn:
        "Government Decision No. 04/2006/QD-TTg established Chan May - Lang Co Economic Zone with prime investment incentive policies.",
    },
    {
      date: "28/09/2007",
      year: 2007,
      titleVi: "Thành lập Công ty TNHH MTV Cảng Chân Mây",
      titleEn: "Incorporation of Chan May Port One-Member LLC",
      contentVi:
        "Chuyển đổi mô hình quản lý sang doanh nghiệp hạch toán độc lập thuộc Tập đoàn Công nghiệp Tàu thủy Việt Nam theo Quyết định số 3128/QĐ-CNT.",
      contentEn:
        "Transitioned into an independent state enterprise LLC under Vietnam Shipbuilding Industry Corporation.",
    },
    {
      date: "25/09/2015",
      year: 2015,
      titleVi: "Cổ phần hóa thành Công ty Cổ phần Cảng Chân Mây (CMP)",
      titleEn: "Equitization into Chan May Port Joint Stock Company",
      contentVi:
        "Ủy ban Chứng khoán Nhà nước chấp thuận hồ sơ đại chúng. Công ty chính thức vận hành theo mô hình công ty cổ phần, nâng cao năng lực quản trị.",
      contentEn:
        "SSC officially approved public company status, establishing Chan May Port Joint Stock Company (Stock Code: CMP).",
    },
    {
      date: "Giai đoạn 2024–2026",
      year: 2026,
      titleVi: "Đột phá Bến 4 & 5 và Chuỗi Logistics Quốc tế",
      titleEn: "Breakthrough Berths 4 & 5 and International Logistics",
      contentVi:
        "Tập trung đầu tư hoàn thiện cụm Bến số 4 và Bến số 5 với độ sâu -14m, kết hợp ICD Lao Bảo và đội tàu chuyên tuyến mở ra hành lang xuyên biên giới.",
      contentEn:
        "Strategic expansion with continuous 540m quay line at Berths 4 & 5 (-14m draft), integrated with Lao Bao ICD and container feeder network.",
    },
  ] as HistoryMilestone[],

  departments: [
    {
      id: "board",
      nameVi: "Đại hội đồng Cổ đông & Hội đồng Quản trị",
      nameEn: "General Meeting of Shareholders & Board of Directors",
      descVi: "Cơ quan lãnh đạo cao nhất hoạch định chiến lược phát triển, kế hoạch tài chính và quyết định đầu tư mở rộng hạ tầng cảng.",
      descEn: "Highest governance body shaping long-term strategic direction, capital investment, and port infrastructure expansions.",
    },
    {
      id: "supervisory",
      nameVi: "Ban Kiểm soát",
      nameEn: "Supervisory Board",
      descVi: "Kiểm tra, giám sát độc lập tính hợp pháp, minh bạch trong công tác quản trị, điều hành tài chính và hoạt động kinh doanh.",
      descEn: "Independent oversight ensuring compliance, transparency, and financial integrity across corporate operations.",
    },
    {
      id: "executive",
      nameVi: "Ban Tổng Giám đốc",
      nameEn: "Board of Management (Executive Officers)",
      descVi: "Trực tiếp điều hành mọi hoạt động sản xuất kinh doanh thường nhật, khai thác cảng, an toàn hàng hải và quan hệ đối tác.",
      descEn: "Directly administers daily commercial operations, terminal stevedoring, maritime security, and partnership development.",
    },
    {
      id: "commercial",
      nameVi: "Phòng Kinh doanh – Khai thác",
      nameEn: "Commercial & Port Operations Department",
      descVi: "Đầu mối tiếp nhận yêu cầu mở tuyến của hãng tàu, quản lý hợp đồng xếp dỡ hàng hóa container và hàng rời, biểu phí và chăm sóc khách hàng.",
      descEn: "Central liaison for carrier line openings, bulk/container stevedoring contracts, tariff policies, and customer support.",
    },
    {
      id: "dispatch",
      nameVi: "Phòng Điều độ – Dịch vụ Cảng biển",
      nameEn: "Vessel Dispatch & Marine Services Department",
      descVi: "Lập kế hoạch cầu bến, điều độ hoa tiêu, lai dắt, xếp dỡ giải phóng tàu 24/7 và đảm bảo an toàn an ninh hàng hải theo chuẩn ISPS.",
      descEn: "Coordinates 24/7 berthing allocations, tugboat assistance, stevedoring workflows, and ISPS-compliant maritime safety.",
    },
    {
      id: "engineering",
      nameVi: "Phòng Kỹ thuật – Công nghệ & Cơ giới",
      nameEn: "Technical Engineering & Equipment Department",
      descVi: "Quản lý bảo trì hệ thống cẩu bờ STS, RTG, xe đầu kéo, băng tải hàng rời kín và hạ tầng công nghệ thông tin điều hành cảng.",
      descEn: "Manages lifecycle maintenance for STS quay cranes, RTGs, terminal tractors, closed conveyors, and IT terminal systems.",
    },
    {
      id: "finance_admin",
      nameVi: "Phòng Tài chính – Kế toán & Tổ chức Hành chính",
      nameEn: "Finance & Accounting / Human Resources Administration",
      descVi: "Quản lý dòng vốn, thanh quyết toán, chế độ chính sách cho 250 cán bộ công nhân viên và đối ngoại doanh nghiệp.",
      descEn: "Administers corporate finances, settlement accounting, HR policies for 250 staff, and public relations.",
    },
  ] as OrgDepartment[],

  strategicGoals: [
    {
      id: "green_port",
      titleVi: "Phát triển Cảng Xanh & Bền vững (Green Port)",
      titleEn: "Green Port & Sustainable Environmental Stewardship",
      descVi: "Triển khai hệ thống cấp điện từ bờ (AMP) giúp tàu tắt máy phát khi cập bến, chuyển đổi 100% thiết bị xếp dỡ sang chạy điện, lắp đặt năng lượng mặt trời áp mái và giám sát phát thải khí nhà kính chặt chẽ.",
      descEn: "Implementing Alternative Maritime Power (AMP), electrifying terminal handling equipment, installing rooftop solar panels, and monitoring carbon footprints.",
      iconName: "Leaf",
    },
    {
      id: "digital_port",
      titleVi: "Chuyển đổi số toàn diện & Cảng thông minh (Smart Port)",
      titleEn: "Digital Transformation & Smart Port Automation",
      descVi: "Triển khai phần mềm quản lý khai thác cảng e-Port, tự động hóa cổng cảng (Smart Gate), kết nối hải quan điện tử một cửa quốc gia, rút ngắn thời gian làm thủ tục thông quan xuống dưới 15 phút.",
      descEn: "Deploying e-Port terminal operating systems, smart gate OCR technologies, and single-window digital customs to cut clearance times under 15 minutes.",
      iconName: "Cpu",
    },
    {
      id: "cross_border",
      titleVi: "Đột phá Logistics xuyên biên giới Hành lang EWEC",
      titleEn: "Cross-Border Logistics Breakthrough along EWEC",
      descVi: "Liên kết chặt chẽ mạng lưới Cảng Chân Mây – ICD Lao Bảo – Đội tàu VSICO, tối ưu hóa cung đường 150 km ngắn nhất kết nối hàng hóa xuất nhập khẩu của Lào, Đông Bắc Thái Lan ra biển Đông.",
      descEn: "Seamlessly chaining Chan May Port with Lao Bao ICD and VSICO container feeders, optimizing the shortest 150 km corridor from Laos and Northeast Thailand to international waters.",
      iconName: "Globe",
    },
    {
      id: "cruise_hub",
      titleVi: "Nâng tầm Trung tâm Du lịch Tàu biển Quốc tế",
      titleEn: "International Cruise Tourism Hub of Excellence",
      descVi: "Giữ vững vị thế điểm dừng chân hàng đầu của các siêu du thuyền quốc tế (Royal Caribbean, TUI Cruises, Silversea), sẵn sàng tiếp nhận các tàu du lịch thế hệ mới dài đến 362m.",
      descEn: "Maintaining status as the premier stopover for global luxury liners (Royal Caribbean, TUI Cruises, Silversea), capable of handling mega cruise ships up to 362m.",
      iconName: "Anchor",
    },
  ] as StrategicGoal[],
};
