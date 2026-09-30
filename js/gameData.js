/**
 * Dữ liệu kịch bản & câu hỏi Game Tư Tưởng Hồ Chí Minh
 * Nguồn tư liệu: Hồ Chí Minh Toàn tập, NXB Chính trị quốc gia Sự thật
 * Nguồn hình ảnh: Ảnh tư liệu lịch sử (Wikimedia Commons)
 */
const GAME_DATA = {
  stages: [
    {
      id: 1,
      code: "STAGE_1",
      title: "CHẶNG 1: NHẬN DIỆN SỨC MẠNH CHIẾN LƯỢC",
      topic: "Tư tưởng Hồ Chí Minh về Đại đoàn kết toàn dân tộc",
      badge: "Chiến Lược Cách Mạng",
      background: "assets/images/real_bg_badinh.jpg",
      music: {
        id: "nhu_co_bac_trong_ngay_dai_thang",
        title: "Như có Bác trong ngày đại thắng",
        author: "Nhạc & Lời: Nhạc sĩ Phạm Tuyên",
        src: "assets/audio/nhu_co_bac_trong_ngay_dai_thang.mp3",
        melodyKey: "nhu_co_bac_trong_ngay_dai_thang"
      },
      narrator: {
        name: "Tư tưởng Hồ Chí Minh",
        title: "Tư tưởng & Lời dạy Lịch sử",
        avatar: "assets/images/ho_chi_minh_1946.jpg",
        avatarSource: "Ảnh tư liệu lịch sử năm 1946 (Wikimedia Commons)"
      },
      introDialogue: [
        {
          speaker: "Tư tưởng Hồ Chí Minh",
          text: "Đại đoàn kết toàn dân tộc là vấn đề có ý nghĩa chiến lược, quyết định thành công của cách mạng. Đây không phải là thủ đoạn chính trị hay sách lược nhất thời mà là chiến lược nhất quán, lâu dài.",
          quote: null
        },
        {
          speaker: "Tư tưởng Hồ Chí Minh",
          text: "Chủ tịch Hồ Chí Minh đã đúc kết bài học lịch sử của dân tộc ta thành chân lý bất hủ:",
          quote: "Đoàn kết, đoàn kết, đại đoàn kết\nThành công, thành công, đại thành công."
        }
      ],
      scenarios: [
        {
          id: "1-1",
          scenarioIndex: 1,
          title: "Sức mạnh sống còn của đoàn kết",
          contextHeader: "TÌNH HUỐNG 1",
          quoteContext: "Lúc nào dân ta đoàn kết muôn người như một thì nước ta độc lập, tự do.",
          question: "Dựa trên lời dạy của Bác: \"Lúc nào dân ta đoàn kết muôn người như một thì nước ta độc lập, tự do\", điều gì sẽ xảy ra nếu dân ta không đoàn kết?",
          options: [
            {
              id: "A",
              text: "Mất đi mục tiêu, nhiệm vụ hàng đầu của Đảng trong việc phụng sự Tổ quốc.",
              isCorrect: false
            },
            {
              id: "B",
              text: "Bị nước ngoài xâm lấn.",
              isCorrect: true
            },
            {
              id: "C",
              text: "Bị lệ thuộc hay thao túng bởi các thế lực bên ngoài trên không gian mạng.",
              isCorrect: false
            },
            {
              id: "D",
              text: "Sẽ không thể kết hợp được sức mạnh dân tộc với sức mạnh thời đại.",
              isCorrect: false
            }
          ],
          correctOptionId: "B",
          points: 10,
          quoteLesson: "Trái lại lúc nào dân ta không đoàn kết thì bị nước ngoài xâm lấn.",
          coreTakeaway: "Đại đoàn kết toàn dân tộc là sức mạnh quyết định thắng lợi cách mạng. Khi khối đại đoàn kết bị suy yếu, quốc gia sẽ đứng trước nguy cơ bị ngoại xâm và mất quyền độc lập, tự do.",
          hintText: "Hãy suy ngẫm kỹ về lời dạy của Bác: khi toàn dân không giữ được khối đại đoàn kết thì đất nước sẽ phải đối mặt trực tiếp với nguy cơ gì?"
        },
        {
          id: "1-2",
          scenarioIndex: 2,
          title: "Bản chất của chiến lược đại đoàn kết",
          contextHeader: "TÌNH HUỐNG 2",
          quoteContext: "Trong các giai đoạn cách mạng cam go, kẻ thù thường xuyên xuyên tạc rằng khẩu hiệu đoàn kết của ta chỉ là chiêu bài vận động quần chúng để tranh thủ lực lượng tạm thời.",
          question: "Theo tư tưởng Hồ Chí Minh, đại đoàn kết toàn dân tộc phải được xác định như thế nào để đập tan luận điệu sai trái trên?",
          options: [
            {
              id: "A",
              text: "Là một thủ đoạn chính trị khôn khéo nhằm tập hợp lực lượng trước mắt trong thời kỳ kháng chiến.",
              isCorrect: false
            },
            {
              id: "B",
              text: "Là sách lược linh hoạt, có thể thay đổi tùy theo yêu cầu của từng giai đoạn đối ngoại.",
              isCorrect: false
            },
            {
              id: "C",
              text: "Là đường lối chiến lược lâu dài, nhất quán, quyết định thành bại của toàn bộ tiến trình cách mạng.",
              isCorrect: true
            },
            {
              id: "D",
              text: "Là phương thức tuyên truyền dân vận của riêng các tổ chức đoàn thể quần chúng.",
              isCorrect: false
            }
          ],
          correctOptionId: "C",
          points: 10,
          quoteLesson: "Đoàn kết không phải là thủ đoạn chính trị hay sách lược nhất thời, mà là chiến lược sống còn, lâu dài, nhất quán xuyên suốt mọi giai đoạn cách mạng.",
          coreTakeaway: "Đại đoàn kết toàn dân tộc là đường lối chiến lược nhất quán, lâu dài và mang tính sống còn đối với toàn bộ tiến trình cách mạng Việt Nam.",
          hintText: "Hãy suy ngẫm xem đại đoàn kết theo tư tưởng Hồ Chí Minh là một sách lược tạm thời hay là chiến lược lâu dài, nhất quán của cách mạng?"
        },
        {
          id: "1-3",
          scenarioIndex: 3,
          title: "Nguồn gốc và vị trí của sức mạnh cách mạng",
          contextHeader: "TÌNH HUỐNG 3",
          quoteContext: "Khi bước vào sự nghiệp giải phóng dân tộc và xây dựng lại đất nước từ cảnh nghèo nàn, lạc hậu, vấn đề tìm kiếm nguồn động lực quyết định thắng lợi được đặt ra bức thiết hơn bao giờ hết.",
          question: "Chủ tịch Hồ Chí Minh khẳng định cội nguồn sức mạnh vô địch của khối đại đoàn kết bắt nguồn từ đâu?",
          options: [
            {
              id: "A",
              text: "Từ khối lượng của cải vật chất dồi dào và nguồn viện trợ kinh tế của các nước anh em.",
              isCorrect: false
            },
            {
              id: "B",
              text: "Từ sức mạnh vô tận của quần chúng nhân dân - nhân dân là gốc, là chủ thể của đoàn kết.",
              isCorrect: true
            },
            {
              id: "C",
              text: "Từ ưu thế vũ khí hiện đại và trang thiết bị quân sự áp đảo trên chiến trường.",
              isCorrect: false
            },
            {
              id: "D",
              text: "Từ tài thao lược ngoại giao của đội ngũ cán bộ lãnh đạo cấp cao.",
              isCorrect: false
            }
          ],
          correctOptionId: "B",
          points: 10,
          quoteLesson: "Dân như nước mình như cá. Dễ trăm lần không dân cũng chịu, khó vạn lần dân liệu cũng xong. Đại đoàn kết bắt nguồn từ sức mạnh vô biên của quần chúng nhân dân khi được giác ngộ và tổ chức.",
          coreTakeaway: "Quần chúng nhân dân là người sáng tạo ra lịch sử, là 'gốc' và là chủ thể tối cao tạo nên sức mạnh vô địch của khối đại đoàn kết toàn dân tộc.",
          hintText: "Hãy suy ngẫm xem trong tư tưởng của Bác, chủ thể nào là 'gốc', là cội nguồn của mọi thắng lợi cách mạng?"
        }
      ]
    },
    {
      id: 2,
      code: "STAGE_2",
      title: "CHẶNG 2: KHOAN DUNG TRÊN KHÔNG GIAN SỐ",
      topic: "Tư tưởng Hồ Chí Minh về Khoan dung, Nhân ái và Cầu đồng tồn dị",
      badge: "Văn Hóa Ứng Xử Số",
      background: "assets/images/real_bg_badinh.jpg",
      music: {
        id: "ho_chi_minh_dep_nhat_ten_nguoi",
        title: "Hồ Chí Minh đẹp nhất tên Người",
        author: "Nhạc & Lời: Nhạc sĩ Trần Kiết Tường",
        src: "assets/audio/ho_chi_minh_dep_nhat_ten_nguoi.mp3",
        melodyKey: "ho_chi_minh_dep_nhat_ten_nguoi"
      },
      narrator: {
        name: "Tư tưởng Hồ Chí Minh",
        title: "Lời dạy về Khoan dung & Cầu đồng tồn dị",
        avatar: "assets/images/ho_chi_minh_1946.jpg",
        avatarSource: "Ảnh tư liệu lịch sử năm 1946 (Wikimedia Commons)"
      },
      introDialogue: [
        {
          speaker: "Tư tưởng Hồ Chí Minh",
          text: "Không gian mạng tiềm ẩn các nguy cơ chia rẽ sâu sắc, phân hóa và các cuộc tấn công tư tưởng tinh vi.",
          quote: null
        },
        {
          speaker: "Tư tưởng Hồ Chí Minh",
          text: "Tuy nhiên, Bác đã căn dặn bằng hình tượng sâu sắc và nhân văn:",
          quote: "Năm ngón tay cũng có ngón vắn ngón dài. Nhưng vắn dài đều họp nhau lại nơi bàn tay. Trong mấy triệu người cũng có người thế này hay thế khác, nhưng đều là dòng dõi tổ tiên ta."
        },
        {
          speaker: "Tư tưởng Hồ Chí Minh",
          text: "Khi đứng trước các luồng thông tin phức tạp trên không gian số, hãy lựa chọn hành động ứng xử nhân văn và đúng đắn nhất theo tư tưởng của Người.",
          quote: null
        }
      ],
      scenarios: [
        {
          id: "2-1",
          scenarioIndex: 1,
          isSocialModeration: true,
          title: "Người trẻ chia sẻ tin đồn thất thiệt",
          contextHeader: "TÌNH HUỐNG 1: KIỂM DUYỆT & ỨNG XỬ SỐ",
          postImage: "assets/images/chang2_1.png",
          postAuthor: {
            handle: "@genz_lichsu99",
            name: "Bạn trẻ trên mạng xã hội",
            avatar: "👤",
            badge: "Thành viên cộng đồng"
          },
          postContent: "Hôm nay lướt mạng thấy bảo chiến thắng Điện Biên Phủ toàn do yếu tố may mắn chứ quân đội mình làm gì đủ sức. Hoang mang quá, sách giáo khoa có nói thật không vậy mọi người?",
          question: "Là một công dân số bản lĩnh, bạn kích hoạt hành động xử lý nào đối với bài viết này?",
          options: [
            {
              id: "KHOAN_DUNG",
              type: "tolerate",
              title: "ĐỐI THOẠI & CẢM HÓA",
              desc: "Nhắn tin giải thích, chia sẻ tư liệu chính thống",
              isCorrect: true,
              feedbackCorrect: "Chính xác! Đây là người lầm lỡ, thiếu thông tin, cần dùng lẽ phải và tài liệu chính thống để giải thích, mở rộng hiểu biết.",
              feedbackWrong: "Lựa chọn chưa đúng. Chặn/công kích người chưa hiểu biết sẽ đẩy họ ra xa khối đại đoàn kết, tạo sự chống đối ngầm."
            },
            {
              id: "XU_LY_NGHIEM",
              type: "enforce",
              title: "BÁO CÁO & XỬ LÝ NGHIÊM",
              desc: "Báo cáo vi phạm, ngăn chặn thông tin sai lệch",
              isCorrect: false,
              feedbackCorrect: "",
              feedbackWrong: "Lựa chọn chưa đúng. Chặn/công kích người chưa hiểu biết sẽ đẩy họ ra xa khối đại đoàn kết, tạo sự chống đối ngầm."
            }
          ],
          correctOptionId: "KHOAN_DUNG",
          points: 10,
          quoteLesson: "Năm ngón tay có ngón vắn ngón dài nhưng đều là dòng dõi tổ tiên ta. Bác dạy ta phải biết mở lòng với người lầm lỡ; dùng lẽ phải, sự bao dung và nguồn tin chính thống để cảm hóa.",
          coreTakeaway: "Khoan dung, cảm hóa người lầm lỡ bằng lẽ phải và thông tin chính thống để củng cố khối đại đoàn kết toàn dân.",
          hintText: "Hãy xem xét đối tượng phát ngôn: Đây là một bạn trẻ đang hoang mang do thiếu thông tin hay là đối tượng cố ý chống phá?"
        },
        {
          id: "2-2",
          scenarioIndex: 2,
          isSocialModeration: true,
          title: "Kẻ mượn danh kích động thù hằn vùng miền",
          contextHeader: "TÌNH HUỐNG 2: KIỂM DUYỆT & ỨNG XỬ SỐ",
          postImage: "assets/images/chang2_2.png",
          postAuthor: {
            handle: "@anonymous_vnvn",
            name: "Tài khoản ẩn danh",
            avatar: "🎭",
            badge: "Tài khoản ảo, không có ảnh đại diện"
          },
          postContent: "Dân tỉnh A toàn dân trộm cắp, dân tỉnh B thì ki bo bủn xỉn. Cứ phân biệt rạch ròi thế cho dễ sống, đoàn kết làm gì với lũ ấy!",
          question: "Là một công dân số bản lĩnh, bạn kích hoạt hành động xử lý nào đối với bài viết này?",
          options: [
            {
              id: "KHOAN_DUNG",
              type: "tolerate",
              title: "ĐỐI THOẠI & CẢM HÓA",
              desc: "Nhắn tin giải thích, chia sẻ tư liệu chính thống",
              isCorrect: false,
              feedbackCorrect: "",
              feedbackWrong: "Lựa chọn chưa đúng. Khoan dung vô nguyên tắc với kẻ cố tình gây chia rẽ, phá hoại nền tảng tư tưởng là mềm yếu, thiếu cảnh giác."
            },
            {
              id: "XU_LY_NGHIEM",
              type: "enforce",
              title: "BÁO CÁO & XỬ LÝ NGHIÊM",
              desc: "Báo cáo vi phạm, ngăn chặn âm mưu chia rẽ",
              isCorrect: true,
              feedbackCorrect: "Chính xác! Hành vi có chủ đích phá hoại tinh thần 'năm ngón tay trên một bàn tay', chia rẽ dân tộc; cần lập tức báo cáo vi phạm, không nhượng bộ.",
              feedbackWrong: "Lựa chọn chưa đúng. Khoan dung vô nguyên tắc với kẻ cố tình gây chia rẽ, phá hoại nền tảng tư tưởng là mềm yếu, thiếu cảnh giác."
            }
          ],
          correctOptionId: "XU_LY_NGHIEM",
          points: 10,
          quoteLesson: "Khoan dung phải đi liền với nguyên tắc và lập trường vững vàng. Kiên quyết đấu tranh, báo cáo ngăn chặn các hành vi cố tình châm ngòi chia rẽ khối đại đoàn kết toàn dân tộc.",
          coreTakeaway: "Khoan dung có nguyên tắc: Kiên quyết xử lý nghiêm các hành vi có chủ đích chia rẽ vùng miền, phá hoại sự đoàn kết.",
          hintText: "Hãy chú ý ngôn từ miệt thị có tính toán: Đây là hành vi có chủ đích phá hoại tinh thần đoàn kết, không thể nhân nhượng vô nguyên tắc."
        },
        {
          id: "2-3",
          scenarioIndex: 3,
          isSocialModeration: true,
          title: "Kiều bào xa xứ có góc nhìn băn khoăn",
          contextHeader: "TÌNH HUỐNG 3: KIỂM DUYỆT & ỨNG XỬ SỐ",
          postImage: "assets/images/chang2_3.png",
          postAuthor: {
            handle: "@vietkieu_saigon",
            name: "Kiều bào xa quê",
            avatar: "🌏",
            badge: "Người Việt Nam ở nước ngoài (30 năm xa xứ)"
          },
          postContent: "Tôi sống ở nước ngoài 30 năm, thấy đất nước phát triển nhưng vẫn còn nhiều thủ tục rườm rà và ô nhiễm quá. Muốn về đầu tư nhưng cứ e ngại, không biết tiếng nói của mình có được lắng nghe không.",
          question: "Thực hiện phương châm \"Cầu đồng tồn dị\" của Bác, bạn chọn hành động nào?",
          options: [
            {
              id: "KHOAN_DUNG",
              type: "tolerate",
              title: "LẮNG NGHE & CẦU THỊ",
              desc: "Tìm điểm tương đồng, trân trọng góc nhìn xây dựng",
              isCorrect: true,
              feedbackCorrect: "Chính xác! Kiều bào là bộ phận không thể tách rời của dân tộc. Cần cầu thị, lắng nghe, lấy mục tiêu xây dựng quê hương làm mẫu số chung để đón nhận đóng góp xây dựng.",
              feedbackWrong: "Lựa chọn chưa đúng. Gắn mác thù địch hoặc tẩy chay người có ý kiến băn khoăn sẽ làm thu hẹp khối đại đoàn kết dân tộc."
            },
            {
              id: "XU_LY_NGHIEM",
              type: "enforce",
              title: "BÁO CÁO & XỬ LÝ NGHIÊM",
              desc: "Báo cáo vi phạm, tẩy chay tài khoản",
              isCorrect: false,
              feedbackCorrect: "",
              feedbackWrong: "Lựa chọn chưa đúng. Gắn mác thù địch hoặc tẩy chay người có ý kiến băn khoăn sẽ làm thu hẹp khối đại đoàn kết dân tộc."
            }
          ],
          correctOptionId: "KHOAN_DUNG",
          points: 10,
          quoteLesson: "Bác từng dạy: 'Ai có tài, có đức, có sức, có lòng phụng sự Tổ quốc và phục vụ nhân dân thì ta đoàn kết với họ.' Lấy tình yêu quê hương làm mẫu số chung để quy tụ và lắng nghe kiều bào.",
          coreTakeaway: "Quy tụ kiều bào: Cầu thị, lắng nghe đóng góp xây dựng, lấy sự phát triển của Tổ quốc làm mẫu số chung.",
          hintText: "Hãy nhớ lời Bác về 'Cầu đồng tồn dị': Kiều bào mong muốn về đầu tư đóng góp cho quê hương, cần cầu thị lắng nghe và cùng hướng về lợi ích đất nước."
        },
        {
          id: "2-4",
          scenarioIndex: 4,
          isSocialModeration: true,
          title: "Học giả mượn danh phản biện để phá hoại kinh tế",
          contextHeader: "TÌNH HUỐNG 4: KIỂM DUYỆT & ỨNG XỬ SỐ",
          postImage: "assets/images/chang2_4.png",
          postAuthor: {
            handle: "@dr_kinhte_vimo",
            name: "Tài khoản tự xưng chuyên gia",
            avatar: "📈",
            badge: "Chuyên gia phân tích độc lập (Có tích xanh)"
          },
          postContent: "Theo nghiên cứu độc lập của tôi, mô hình kinh tế thị trường định hướng XHCN không có tương lai. Các doanh nghiệp trong nước nên sớm chuyển tài sản ra nước ngoài để phòng rủi ro, đừng tin vào những cam kết hỗ trợ của Nhà nước.",
          question: "Trước bài viết núp bóng phân tích chuyên môn để gây hoang mang, kích động tháo chạy dòng vốn, bạn kích hoạt hành động nào?",
          options: [
            {
              id: "KHOAN_DUNG",
              type: "tolerate",
              title: "ĐỐI THOẠI & CẢM HÓA",
              desc: "Bình luận trao đổi, tranh luận học thuật",
              isCorrect: false,
              feedbackCorrect: "",
              feedbackWrong: "Lựa chọn chưa đúng. Đây không phải phản biện học thuật mang tính xây dựng mà là thủ đoạn tinh vi nhằm làm suy kiệt nền kinh tế và phá hoại niềm tin; khoan nhượng lúc này là mơ hồ, mất cảnh giác."
            },
            {
              id: "XU_LY_NGHIEM",
              type: "enforce",
              title: "BÁO CÁO & XỬ LÝ NGHIÊM",
              desc: "Báo cáo vi phạm, ngăn chặn thao túng kinh tế",
              isCorrect: true,
              feedbackCorrect: "Chính xác! Cần phân biệt rõ tự do học thuật chân chính với hành vi mượn danh chuyên gia để thao túng tâm lý và phá hoại nội lực đất nước; kiên quyết báo cáo và xử lý theo pháp luật.",
              feedbackWrong: "Lựa chọn chưa đúng. Khoan dung phải có nguyên tắc; với hành vi cố tình phá hoại nền tảng kinh tế đất nước, ta phải kiên quyết đấu tranh."
            }
          ],
          correctOptionId: "XU_LY_NGHIEM",
          points: 10,
          quoteLesson: "Bác từng căn dặn: 'Đoàn kết là sức mạnh, nhưng đoàn kết phải có nguyên tắc vững vàng.' Với những luận điệu phá hoại có chủ đích núp bóng tri thức, ta phải kiên quyết đấu tranh vạch trần để bảo vệ sự ổn định của Tổ quốc.",
          coreTakeaway: "Cảnh giác trước thủ đoạn tinh vi: Phân biệt phản biện xây dựng với hành vi núp bóng chuyên gia để phá hoại khối đại đoàn kết và nền kinh tế.",
          hintText: "Bẫy tư duy: Bài viết này có phải là nghiên cứu đóng góp giải pháp, hay đang cố ý kích động doanh nghiệp chuyển tiền ra nước ngoài làm tổn hại nền kinh tế đất nước?"
        },
        {
          id: "2-5",
          scenarioIndex: 5,
          isSocialModeration: true,
          title: "Người từng lầm đường lạc lối thật tâm muốn tạ lỗi",
          contextHeader: "TÌNH HUỐNG 5: KIỂM DUYỆT & ỨNG XỬ SỐ",
          postImage: "assets/images/chang2_5.png",
          postAuthor: {
            handle: "@nguoicon_lamlo_1975",
            name: "Cựu thành viên hội nhóm hải ngoại",
            avatar: "🕊️",
            badge: "Đã từ bỏ các tổ chức lưu vong chống phá"
          },
          postContent: "Nhiều năm qua tôi mù quáng tham gia các tổ chức lưu vong chống đối quê hương. Nay tuổi xế bóng, tôi đã nhận ra sự lừa bịp và ân hận tột cùng. Tôi chỉ mong được bà con mở lòng, cho tôi chuyển toàn bộ tiền tiết kiệm dưỡng già về ủng hộ đồng bào vùng lũ miền Trung để chuộc lại một phần lỗi lầm.",
          question: "Đứng trước lời trần tình và mong muốn hồi hương chuộc lỗi của một người từng lầm lỡ, bạn chọn hành động nào?",
          options: [
            {
              id: "KHOAN_DUNG",
              type: "tolerate",
              title: "BAO DUNG & ĐÓN NHẬN",
              desc: "Mở lòng tha thứ, đón nhận tấm lòng hoàn lương",
              isCorrect: true,
              feedbackCorrect: "Chính xác! 'Đánh kẻ chạy đi, không ai đánh người chạy lại'. Bác dạy phải mở rộng lòng bao dung với những ai thật tâm hối cải, quy tụ mọi con dân đất Việt cùng hướng về Tổ quốc.",
              feedbackWrong: "Lựa chọn chưa đúng. Nếu ta mãi kỳ thị, xua đuổi người đã thật lòng hối cải thì sẽ vô tình đẩy họ trở lại vòng tay của các thế lực xấu, đi ngược lại tinh thần đại đoàn kết của Bác."
            },
            {
              id: "XU_LY_NGHIEM",
              type: "enforce",
              title: "BÁO CÁO & XỬ LÝ NGHIÊM",
              desc: "Báo cáo vi phạm, tiếp tục tẩy chay",
              isCorrect: false,
              feedbackCorrect: "",
              feedbackWrong: "Lựa chọn chưa đúng. Nếu ta mãi kỳ thị, xua đuổi người đã thật lòng hối cải thì sẽ vô tình đẩy họ trở lại vòng tay của các thế lực xấu, đi ngược lại tinh thần đại đoàn kết của Bác."
            }
          ],
          correctOptionId: "KHOAN_DUNG",
          points: 10,
          quoteLesson: "Bác dạy: 'Đối với những người lầm đường lạc lối, ta phải lấy tình thân ái mà cảm hóa họ. Kẻ nào thật thà hối cải thì ta hoan nghênh và sẵn sàng tha thứ.' Lấy đại nghĩa để hóa giải hận thù, biến thù thành bạn.",
          coreTakeaway: "Đỉnh cao nhân văn của Bác: Khoan dung, mở rộng vòng tay đón nhận những người từng lầm lỡ nhưng đã thật tâm hối cải quay về phụng sự non sông.",
          hintText: "Hãy nhớ truyền thống 'Đánh kẻ chạy đi, không ai đánh người chạy lại': Đối với người từng lầm đường nay đã thật tâm muốn tạ lỗi và cống hiến cho đồng bào, ta nên có tấm lòng bao dung như thế nào?"
        }
      ]
    },
    {
      id: 3,
      code: "STAGE_3",
      title: "CHẶNG 3: CÁN CÂN CHIẾN LƯỢC \"XÂY\" VÀ \"CHỐNG\"",
      topic: "Tư tưởng Hồ Chí Minh về Kết hợp chặt chẽ giữa 'Xây' và 'Chống' trên không gian số",
      badge: "Cán Cân Chiến Lược",
      isBalanceStage: true,
      background: "assets/images/real_bg_badinh.jpg",
      music: {
        id: "nhu_co_bac_trong_ngay_dai_thang",
        title: "Như có Bác trong ngày đại thắng",
        author: "Nhạc & Lời: Nhạc sĩ Phạm Tuyên",
        src: "assets/audio/nhu_co_bac_trong_ngay_dai_thang.mp3",
        melodyKey: "nhu_co_bac_trong_ngay_dai_thang"
      },
      narrator: {
        name: "Tư tưởng Hồ Chí Minh",
        title: "Chiến lược 'Xây' & 'Chống'",
        avatar: "assets/images/ho_chi_minh_1946.jpg"
      },
      introDialogue: [
        {
          speaker: "Tư tưởng Hồ Chí Minh",
          text: "Trên không gian số, giữ gìn khối đại đoàn kết đòi hỏi sự kết hợp nhịp nhàng giữa hai nhiệm vụ chiến lược: 'XÂY' (bồi dưỡng cái tốt, lan tỏa năng lượng tích cực) và 'CHỐNG' (ngăn chặn mầm mống độc hại, bài trừ tiêu cực, phản bác tin giả).",
          quote: null
        },
        {
          speaker: "Tư tưởng Hồ Chí Minh",
          text: "Chủ tịch Hồ Chí Minh đã đúc kết nguyên lý biện chứng sâu sắc:",
          quote: "Muốn đoàn kết chặt chẽ thì phải xây dựng cái tốt, bồi đắp tình thân ái; đồng thời phải kiên quyết đấu tranh trừ tiệt những thói xấu chia rẽ."
        },
        {
          speaker: "Tư tưởng Hồ Chí Minh",
          text: "Trước mắt bạn là 6 thẻ hành vi. Hãy dùng chuột kéo và thả từng thẻ vào đúng đĩa cân tương ứng để thiết lập trạng thái cân bằng cho không gian mạng!",
          quote: null
        }
      ],
      balanceGame: {
        targetTotal: 6,
        pointsPerCard: 5,
        zones: [
          {
            id: "XAY",
            type: "build",
            title: "XÂY",
            sub: "Phủ xanh mạng xã hội",
            color: "#22c55e",
            capacity: 3
          },
          {
            id: "CHONG",
            type: "fight",
            title: "CHỐNG",
            sub: "Triệt phá độc hại",
            color: "#ef4444",
            capacity: 3
          }
        ],
        cards: [
          {
            id: "c1",
            num: 1,
            text: "Không like, không chia sẻ các video cắt ghép giật gân, chưa qua kiểm chứng.",
            targetZone: "CHONG",
            targetName: "CHỐNG",
            reason: "Cắt đứt chuỗi lây lan của tin giả và tâm lý hoang mang, triệt tiêu mầm mống chia rẽ từ trong trứng nước."
          },
          {
            id: "c2",
            num: 2,
            text: "Sáng tạo và lan tỏa clip ngắn về nét đẹp văn hóa, tinh thần tương trợ giữa các vùng miền.",
            targetZone: "XAY",
            targetName: "XÂY",
            reason: "'Lấy cái đẹp dẹp cái xấu', bồi đắp tình cảm gắn bó ruột thịt và củng cố niềm tự hào dân tộc."
          },
          {
            id: "c3",
            num: 3,
            text: "Bấm nút Báo cáo (Report) các trang mạng kích động phân biệt vùng miền, hận thù nội bộ.",
            targetZone: "CHONG",
            targetName: "CHỐNG",
            reason: "Chủ động sử dụng công cụ nền tảng để tẩy sạch không gian số, không dung túng cho hành vi phá hoại đoàn kết."
          },
          {
            id: "c4",
            num: 4,
            text: "Tuyên truyền, chia sẻ những tấm gương thanh niên khởi nghiệp, cống hiến vì cộng đồng.",
            targetZone: "XAY",
            targetName: "XÂY",
            reason: "Khơi dậy tinh thần yêu nước, tạo nguồn năng lượng tích cực và bồi dưỡng lý tưởng sống cao đẹp cho thế hệ trẻ."
          },
          {
            id: "c5",
            num: 5,
            text: "Dẫn nguồn văn bản pháp lý và tư liệu chính thống để phản bác các luận điệu xuyên tạc lịch sử.",
            targetZone: "CHONG",
            targetName: "CHỐNG",
            reason: "Đấu tranh tư tưởng bằng lý lẽ sắc bén, bảo vệ vững chắc nền tảng tư tưởng và sự thật lịch sử của dân tộc."
          },
          {
            id: "c6",
            num: 6,
            text: "Tham gia các chiến dịch phủ xanh thông tin chính thống nhân các ngày lễ lớn của non sông.",
            targetZone: "XAY",
            targetName: "XÂY",
            reason: "Xây dựng thế trận lòng dân vững chắc trên không gian mạng, biến mạng xã hội thành cầu nối gắn kết triệu con tim."
          }
        ]
      }
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GAME_DATA;
}
