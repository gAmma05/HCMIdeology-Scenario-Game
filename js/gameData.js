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
        id: "chang_1",
        title: "Khúc Ca Đoàn Kết Toàn Dân",
        author: "Âm vang Chặng 1",
        src: "assets/audio/chang_1.mp3",
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
        },
        {
          id: "1-4",
          scenarioIndex: 4,
          title: "Đoàn kết trong Đảng - Hạt nhân của khối đại đoàn kết",
          contextHeader: "TÌNH HUỐNG 4",
          quoteContext: "Đoàn kết là một truyền thống cực kỳ quý báu của Đảng và của dân ta. Các đồng chí từ Trung ương đến các chi bộ cần phải giữ gìn sự đoàn kết nhất trí của Đảng như giữ gìn con ngươi của mắt mình.",
          question: "Theo tư tưởng Hồ Chí Minh, vì sao việc giữ gìn sự đoàn kết, nhất trí trong Đảng lại đóng vai trò là \"hạt nhân\", quyết định sự thành bại của khối đại đoàn kết toàn dân tộc?",
          options: [
            {
              id: "A",
              text: "Vì Đảng là lực lượng trực tiếp nắm giữ toàn bộ cơ sở vật chất, tài chính và phương tiện truyền thông của quốc gia.",
              isCorrect: false,
              feedbackWrong: "Chưa đúng. Sức mạnh lãnh đạo của Đảng bắt nguồn từ niềm tin của quần chúng nhân dân chứ không phải dựa vào độc quyền vật chất (A), trông chờ ngoại viện (C) hay áp đặt một chiều (D)."
            },
            {
              id: "B",
              text: "Vì Đảng là hạt nhân lãnh đạo; Đảng có đoàn kết, trong sạch, vững mạnh thì mới làm gương và quy tụ, dẫn dắt được toàn dân tộc thành một khối thống nhất.",
              isCorrect: true,
              feedbackCorrect: "Chính xác! Bác dạy đoàn kết trong Đảng là hạt nhân của khối đại đoàn kết toàn dân tộc. Đảng lãnh đạo vững vàng, gương mẫu thì muôn triệu người dân mới đồng lòng tin tưởng hướng theo."
            },
            {
              id: "C",
              text: "Vì chỉ khi Đảng đoàn kết thì mới tranh thủ được các khoản viện trợ vũ khí tối tân từ các nước đồng minh.",
              isCorrect: false,
              feedbackWrong: "Chưa đúng. Sức mạnh lãnh đạo của Đảng bắt nguồn từ niềm tin của quần chúng nhân dân chứ không phải dựa vào độc quyền vật chất (A), trông chờ ngoại viện (C) hay áp đặt một chiều (D)."
            },
            {
              id: "D",
              text: "Vì sự đoàn kết trong Đảng giúp xóa bỏ hoàn toàn mọi tranh luận khoa học, tạo sự phục tùng tuyệt đối từ cấp dưới.",
              isCorrect: false,
              feedbackWrong: "Chưa đúng. Sức mạnh lãnh đạo của Đảng bắt nguồn từ niềm tin của quần chúng nhân dân chứ không phải dựa vào độc quyền vật chất (A), trông chờ ngoại viện (C) hay áp đặt một chiều (D)."
            }
          ],
          correctOptionId: "B",
          points: 10,
          quoteLesson: "Đoàn kết là một truyền thống cực kỳ quý báu của Đảng và của dân ta. Các đồng chí từ Trung ương đến các chi bộ cần phải giữ gìn sự đoàn kết nhất trí của Đảng như giữ gìn con ngươi của mắt mình.",
          coreTakeaway: "Đoàn kết trong Đảng là hạt nhân tiên quyết. Đảng có gương mẫu, trong sạch và đoàn kết nhất trí thì mới quy tụ và dẫn dắt được sức mạnh của toàn dân tộc.",
          hintText: "Hãy suy ngẫm xem vai trò của Đảng đối với toàn dân tộc là hạt nhân gương mẫu, dẫn dắt hay dựa trên quyền lực vật chất/áp đặt?"
        },
        {
          id: "1-5",
          scenarioIndex: 5,
          title: "Nền gốc của khối đại đoàn kết toàn dân tộc",
          contextHeader: "TÌNH HUỐNG 5",
          quoteContext: "Đại đoàn kết tức là trước hết phải đoàn kết đại đa số nhân dân, mà đại đa số nhân dân ta là công nhân, nông dân và các tầng lớp nhân dân lao động khác. Đó là nền gốc của đại đoàn kết.",
          question: "Chủ tịch Hồ Chí Minh xác định lực lượng nào là \"nền gốc\", là cơ sở vững chắc nhất để xây dựng khối đại đoàn kết toàn dân tộc?",
          options: [
            {
              id: "A",
              text: "Liên minh giai cấp công nhân, giai cấp nông dân và tầng lớp trí thức.",
              isCorrect: true,
              feedbackCorrect: "Chính xác! Công nhân, nông dân và trí thức là lực lượng đông đảo nhất, trực tiếp sản xuất và chiến đấu. Liên minh này chính là 'nền gốc', là trụ cột vững chắc của Mặt trận dân tộc thống nhất."
            },
            {
              id: "B",
              text: "Tầng lớp tư sản dân tộc và các tiểu thương có tiềm lực kinh tế lớn ở đô thị.",
              isCorrect: false,
              feedbackWrong: "Chưa đúng. Bác chủ trương đoàn kết rộng rãi mọi tầng lớp yêu nước (B, D) và bạn bè quốc tế (C), nhưng 'nền gốc' căn bản và vững chắc nhất của khối đại đoàn kết luôn là liên minh Công - Nông - Trí thức."
            },
            {
              id: "C",
              text: "Các tổ chức quốc tế và các phong trào hòa bình ủng hộ Việt Nam từ nước ngoài.",
              isCorrect: false,
              feedbackWrong: "Chưa đúng. Bác chủ trương đoàn kết rộng rãi mọi tầng lớp yêu nước (B, D) và bạn bè quốc tế (C), nhưng 'nền gốc' căn bản và vững chắc nhất của khối đại đoàn kết luôn là liên minh Công - Nông - Trí thức."
            },
            {
              id: "D",
              text: "Đội ngũ nhân sĩ, trí thức du học từ phương Tây trở về nước.",
              isCorrect: false,
              feedbackWrong: "Chưa đúng. Bác chủ trương đoàn kết rộng rãi mọi tầng lớp yêu nước (B, D) và bạn bè quốc tế (C), nhưng 'nền gốc' căn bản và vững chắc nhất của khối đại đoàn kết luôn là liên minh Công - Nông - Trí thức."
            }
          ],
          correctOptionId: "A",
          points: 10,
          quoteLesson: "Đại đoàn kết tức là trước hết phải đoàn kết đại đa số nhân dân, mà đại đa số nhân dân ta là công nhân, nông dân và các tầng lớp nhân dân lao động khác. Đó là nền gốc của đại đoàn kết.",
          coreTakeaway: "Liên minh Công nhân - Nông dân - Trí thức là lực lượng đông đảo nhất, trực tiếp lao động sản xuất, là 'nền gốc' vững chắc của khối đại đoàn kết toàn dân tộc.",
          hintText: "Hãy nhớ lời dạy của Bác: Đại đa số nhân dân lao động trực tiếp sản xuất là lực lượng nào để tạo nên 'nền gốc' của đại đoàn kết?"
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
        id: "chang_2",
        title: "Khúc Ca Khoan Dung Nhân Ái",
        author: "Âm vang Chặng 2",
        src: "assets/audio/chang_2.mp3",
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
          contextHeader: "TÌNH HUỐNG 1",
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
          contextHeader: "TÌNH HUỐNG 2",
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
          contextHeader: "TÌNH HUỐNG 3",
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
          contextHeader: "TÌNH HUỐNG 4",
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
          contextHeader: "TÌNH HUỐNG 5",
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
        id: "chang_3",
        title: "Khúc Ca Cán Cân Xây & Chống",
        author: "Âm vang Chặng 3",
        src: "assets/audio/chang_3.mp3",
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
          text: "Trước mắt bạn là 10 thẻ hành vi. Hãy dùng chuột kéo và thả từng thẻ vào đúng đĩa cân tương ứng để thiết lập trạng thái cân bằng cho không gian mạng!",
          quote: null
        }
      ],
      balanceGame: {
        targetTotal: 10,
        pointsPerCard: 10,
        zones: [
          {
            id: "XAY",
            type: "build",
            title: "XÂY",
            sub: "Phủ xanh mạng xã hội",
            color: "#22c55e",
            capacity: 5
          },
          {
            id: "CHONG",
            type: "fight",
            title: "CHỐNG",
            sub: "Triệt phá độc hại",
            color: "#ef4444",
            capacity: 5
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
          },
          {
            id: "c7",
            num: 7,
            text: "Chủ động viết bài, làm infographic giải thích cặn kẽ đường lối, chính sách mới cho bạn bè cùng hiểu.",
            targetZone: "XAY",
            targetName: "XÂY",
            reason: "Tích cực truyền thông chính sách, củng cố nhận thức đúng đắn và nâng cao sự đồng thuận xã hội ngay từ thế hệ trẻ."
          },
          {
            id: "c8",
            num: 8,
            text: "Cảnh báo người thân, bạn bè về các thủ đoạn giả mạo tổ chức từ thiện để trục lợi và gây mất niềm tin.",
            targetZone: "CHONG",
            targetName: "CHỐNG",
            reason: "Chủ động phòng ngừa tội phạm mạng, bảo vệ niềm tin của nhân dân và ngăn ngừa sự lợi dụng tinh thần tương thân tương ái."
          },
          {
            id: "c9",
            num: 9,
            text: "Chia sẻ khoảnh khắc xúc động về sự giúp đỡ lẫn nhau giữa đồng bào các dân tộc thiểu số và người Kinh.",
            targetZone: "XAY",
            targetName: "XÂY",
            reason: "Bồi đắp khối đại đoàn kết các dân tộc anh em theo lời Bác: 'Sông có thể cạn, núi có thể mòn, song mối đoàn kết ấy không bao giờ giảm bớt'."
          },
          {
            id: "c10",
            num: 10,
            text: "Kiên quyết phản đối và yêu cầu gỡ bỏ các bình luận dùng lời lẽ thù ghét, xúc phạm danh dự đồng bào kiều bào.",
            targetZone: "CHONG",
            targetName: "CHỐNG",
            reason: "Ngăn chặn tư tưởng kỳ thị, chia rẽ kiều bào, kiên quyết bảo vệ tinh thần quy tụ kiều bào hướng về nguồn cội Tổ quốc."
          }
        ]
      }
    },
    {
      id: 4,
      code: "STAGE_4",
      title: "CHẶNG 4: NGOẠI GIAO NHÂN DÂN SỐ",
      topic: "Hải Trình Đào Vàng - Bản Lĩnh Đại Sứ Số: Tư tưởng Hồ Chí Minh về Đoàn Kết Quốc Tế",
      badge: "Đại Sứ Số Toàn Cầu",
      isGoldMinerStage: true,
      background: "assets/images/real_bg_badinh.jpg",
      music: {
        id: "chang_4",
        title: "Khúc Ca Ngoại Giao Nhân Dân",
        author: "Âm vang Chặng 4",
        src: "assets/audio/chang_4.mp3",
        melodyKey: "nhu_co_bac_trong_ngay_dai_thang"
      },
      narrator: {
        name: "Tư tưởng Hồ Chí Minh",
        title: "Lời dạy về Đoàn Kết Quốc Tế & Ngoại Giao Nhân Dân",
        avatar: "assets/images/ho_chi_minh_1946.jpg"
      },
      introDialogue: [
        {
          speaker: "Tư tưởng Hồ Chí Minh",
          text: "Đoàn kết quốc tế là sự kết hợp sức mạnh dân tộc với sức mạnh thời đại. Mỗi công dân mạng Việt Nam là một 'đại sứ số' trên không gian mạng toàn cầu.",
          quote: null
        },
        {
          speaker: "Tư tưởng Hồ Chí Minh",
          text: "Chủ tịch Hồ Chí Minh đã căn dặn về sách lược ngoại giao chính nghĩa:",
          quote: "Thực lực là cái chiêng mà ngoại giao là cái tiếng. Chiêng có to tiếng mới lớn. Phải biết kết hợp sức mạnh dân tộc với sức mạnh thời đại."
        },
        {
          speaker: "Tư tưởng Hồ Chí Minh",
          text: "Hãy dùng sự sáng suốt để chọn đáp án đúng và ngắm bắn mỏ neo vượt qua các luồng nhiễu loạn để kéo về khối đáp án chính xác!",
          quote: null
        }
      ],
      scenarios: [
        {
          id: "4-1",
          scenarioIndex: 1,
          title: "Đấu tranh bảo vệ chủ quyền biển đảo",
          contextHeader: "CÂU 1: HẢI TRÌNH ĐÀO VÀNG",
          question: "Trên diễn đàn quốc tế xuất hiện các bản đồ xuyên tạc ranh giới lãnh hải Việt Nam tại Biển Đông. Để thực hiện ngoại giao nhân dân số vì chính nghĩa, hành động chuẩn xác nhất là gì?",
          options: [
            {
              id: "A",
              text: "Kêu gọi cộng đồng mạng tràn vào tài khoản đối phương spam bão icon phẫn nộ và chửi bới.",
              isCorrect: false
            },
            {
              id: "B",
              text: "Xuất bản bài viết đa ngôn ngữ trích dẫn chứng cứ lịch sử và Công ước LHQ về Luật Biển (UNCLOS 1982) khẳng định chủ quyền Hoàng Sa, Trường Sa.",
              isCorrect: true
            },
            {
              id: "C",
              text: "Đăng tải loạt ảnh danh lam thắng cảnh và ẩm thực các vùng miền để lấn át bài viết xuyên tạc.",
              isCorrect: false
            },
            {
              id: "D",
              text: "Giữ im lặng tuyệt đối vì việc tranh chấp chủ quyền là trách nhiệm riêng của cơ quan ngoại giao nhà nước.",
              isCorrect: false
            }
          ],
          correctOptionId: "B",
          points: 10,
          quoteLesson: "Phải biết kết hợp sức mạnh dân tộc với sức mạnh thời đại, lấy chính nghĩa, công lý và luật pháp quốc tế làm chỗ dựa vững chắc.",
          feedbackCorrect: "Chính xác! Ngoại giao số vì chính nghĩa phải lấy cơ sở pháp lý quốc tế (UNCLOS 1982) và chứng cứ lịch sử làm vũ khí sắc bén nhất để tạo sự đồng thuận quốc tế.",
          feedbackWrong: "Chưa đúng. Spam cảm tính (A) làm xấu hình ảnh đất nước; quảng bá ẩm thực (C) không trực diện giải quyết tranh biện pháp lý; im lặng (D) là thiếu trách nhiệm của công dân số.",
          coreTakeaway: "Ngoại giao nhân dân số vì chính nghĩa phải lấy cơ sở pháp lý quốc tế (UNCLOS 1982) và sự thật lịch sử làm vũ khí sắc bén nhất."
        },
        {
          id: "4-2",
          scenarioIndex: 2,
          title: "Quảng bá hình ảnh Việt Nam đổi mới và hòa bình",
          contextHeader: "CÂU 2: HẢI TRÌNH ĐÀO VÀNG",
          question: "Khi tham gia một diễn đàn thanh niên quốc tế, bạn nhận thấy một số bạn trẻ nước ngoài vẫn giữ định kiến Việt Nam là nước nghèo nàn, lạc hậu và gắn liền với chiến tranh. Bạn xử lý như thế nào?",
          options: [
            {
              id: "A",
              text: "Sáng tạo video ngắn bằng tiếng Anh giới thiệu sự phát triển kinh tế số, xã hội bình yên và con người thân thiện của Việt Nam.",
              isCorrect: true
            },
            {
              id: "B",
              text: "Chỉ trích gay gắt các bạn trẻ quốc tế là thiếu kiến thức địa lý và yêu cầu họ lập tức xin lỗi.",
              isCorrect: false
            },
            {
              id: "C",
              text: "Đăng tải toàn văn các báo cáo kinh tế vĩ mô và nghị quyết bằng tiếng Việt lên diễn đàn.",
              isCorrect: false
            },
            {
              id: "D",
              text: "Tranh luận nảy lửa và tuyên bố không thèm giao lưu với những người có định kiến.",
              isCorrect: false
            }
          ],
          correctOptionId: "A",
          points: 10,
          quoteLesson: "Việt Nam là bạn, là đối tác tin cậy và là thành viên có trách nhiệm trong cộng đồng quốc tế.",
          feedbackCorrect: "Chính xác! Kể những câu chuyện đời thường sinh động, tích cực là cách lan tỏa 'sức mạnh mềm' hiệu quả nhất, hiện thực hóa đường lối Việt Nam là bạn, là đối tác tin cậy của bạn bè năm châu.",
          feedbackWrong: "Chưa đúng. Công kích (B, D) làm gia tăng rào cản; dùng văn bản hành chính hàn lâm (C) không phù hợp tâm lý tiếp nhận của giới trẻ quốc tế.",
          coreTakeaway: "Lan tỏa 'sức mạnh mềm': Kể câu chuyện sinh động, chân thực về văn hóa và con người Việt Nam để xóa bỏ định kiến."
        },
        {
          id: "4-3",
          scenarioIndex: 3,
          title: "Kết hợp sức mạnh dân tộc với sức mạnh thời đại",
          contextHeader: "CÂU 3: HẢI TRÌNH ĐÀO VÀNG",
          question: "Theo tư tưởng Hồ Chí Minh, mục đích cao nhất của việc phát huy 'sức mạnh thời đại' và đoàn kết quốc tế trong kỷ nguyên số là gì?",
          options: [
            {
              id: "A",
              text: "Tranh thủ tối đa nguồn viện trợ tài chính và phụ thuộc vào công nghệ của các nước lớn.",
              isCorrect: false
            },
            {
              id: "B",
              text: "Nhượng bộ một số quyền lợi cốt lõi về dữ liệu số để đổi lấy sự ủng hộ quốc tế.",
              isCorrect: false
            },
            {
              id: "C",
              text: "Tranh thủ sự ủng hộ về nguồn lực, tri thức toàn cầu để phục vụ mục tiêu độc lập, tự chủ và xây dựng đất nước giàu mạnh.",
              isCorrect: true
            },
            {
              id: "D",
              text: "Cô lập hoàn toàn môi trường mạng nội bộ để bảo đảm an toàn tuyệt đối, tránh hội nhập.",
              isCorrect: false
            }
          ],
          correctOptionId: "C",
          points: 10,
          quoteLesson: "Muốn người ta giúp cho thì trước hết mình phải tự giúp lấy mình đã. Kết hợp sức mạnh dân tộc với sức mạnh thời đại trên nguyên tắc giữ vững độc lập, tự chủ.",
          feedbackCorrect: "Chính xác! Bác dạy đoàn kết quốc tế phải dựa trên tinh thần tự lực cánh sinh: kết hợp sức mạnh thời đại để củng cố nội lực, bảo vệ vững chắc độc lập và phát triển đất nước.",
          feedbackWrong: "Chưa đúng. Ỷ lại (A) hay nhượng bộ chủ quyền số (B) đều làm suy yếu đất nước; 'bế quan tỏa cảng' (D) đi ngược lại xu thế phát triển của thời đại.",
          coreTakeaway: "Đoàn kết quốc tế trên cơ sở tự lực cánh sinh: Tranh thủ nguồn lực toàn cầu để phục vụ mục tiêu độc lập, tự chủ và giàu mạnh."
        },
        {
          id: "4-4",
          scenarioIndex: 4,
          title: "Ứng phó với các cuộc tấn công mạng xuyên quốc gia",
          contextHeader: "CÂU 4: HẢI TRÌNH ĐÀO VÀNG",
          question: "Khi hệ thống dữ liệu quốc gia đối mặt với đợt tấn công mạng quy mô lớn từ các tổ chức tội phạm xuyên biên giới, hành động hợp tác quốc tế phù hợp nhất là gì?",
          options: [
            {
              id: "A",
              text: "Kêu gọi các nhóm tin tặc tự do trong nước tấn công trả đũa phá hủy máy chủ nước ngoài.",
              isCorrect: false
            },
            {
              id: "B",
              text: "Tích cực chia sẻ thông tin cảnh báo kỹ thuật và phối hợp cùng các tổ chức an toàn thông tin quốc tế để truy vết, triệt phá mã độc.",
              isCorrect: true
            },
            {
              id: "C",
              text: "Cắt đứt hoàn toàn cáp quang biển và ngừng mọi kết nối internet đi quốc tế.",
              isCorrect: false
            },
            {
              id: "D",
              text: "Giấu kín thông tin sự cố để tránh ảnh hưởng đến uy tín công nghệ của đất nước.",
              isCorrect: false
            }
          ],
          correctOptionId: "B",
          points: 10,
          quoteLesson: "Trước các thách thức an ninh phi truyền thống, sự hợp tác minh bạch, có trách nhiệm dựa trên luật pháp quốc tế là chìa khóa bảo vệ chủ quyền số.",
          feedbackCorrect: "Chính xác! An ninh phi truyền thống mang tính toàn cầu; cần chủ động, minh bạch và có trách nhiệm hợp tác quốc tế theo luật pháp để ngăn ngừa tội phạm công nghệ cao.",
          feedbackWrong: "Chưa đúng. Tấn công phi pháp (A) vi phạm chuẩn mực quốc tế; cắt cáp tự cô lập (C) làm tê liệt kinh tế số; giấu giếm (D) làm tăng nguy cơ tổn thất diện rộng.",
          coreTakeaway: "Hợp tác an ninh mạng quốc tế: Chủ động, minh bạch và trách nhiệm theo chuẩn mực luật pháp quốc tế."
        },
        {
          id: "4-5",
          scenarioIndex: 5,
          title: "Kết nối trí thức kiều bào trên không gian số",
          contextHeader: "CÂU 5: HẢI TRÌNH ĐÀO VÀNG",
          question: "Để khơi dậy tinh thần yêu nước và tranh thủ nguồn lực chất xám của cộng đồng người Việt Nam ở nước ngoài, người trẻ nên phát huy không gian số như thế nào?",
          options: [
            {
              id: "A",
              text: "Xây dựng các mạng lưới, diễn đàn học thuật cởi mở để kiều bào thuận tiện hiến kế, chuyển giao công nghệ cho Tổ quốc.",
              isCorrect: true
            },
            {
              id: "B",
              text: "Luôn hoài nghi và kiểm duyệt khắt khe mọi ý kiến đóng góp của người xa xứ.",
              isCorrect: false
            },
            {
              id: "C",
              text: "Chỉ kêu gọi kiều bào gửi kiều hối hỗ trợ tài chính, không cần tham gia thảo luận các vấn đề phát triển.",
              isCorrect: false
            },
            {
              id: "D",
              text: "Yêu cầu kiều bào phải từ bỏ hoàn toàn lối sống, thói quen ở nước sở tại trước khi tham gia kết nối.",
              isCorrect: false
            }
          ],
          correctOptionId: "A",
          points: 10,
          quoteLesson: "Bác luôn căn dặn: 'Kiều bào là bộ phận không thể tách rời của cộng đồng dân tộc Việt Nam.' Luôn mở rộng vòng tay đón nhận trí thức phụng sự quê hương.",
          feedbackCorrect: "Chính xác! Bác luôn coi người Việt Nam ở nước ngoài là khúc ruột dặm trường; không gian số là cầu nối lý tưởng nhất để quy tụ trí thức kiều bào cùng chung tay phát triển non sông.",
          feedbackWrong: "Chưa đúng. Định kiến (B, D) hay chỉ nhìn nhận kiều bào ở khía cạnh tiền bạc (C) sẽ làm tổn thương lòng yêu nước và rạn nứt khối đại đoàn kết toàn dân tộc.",
          coreTakeaway: "Quy tụ trí thức kiều bào: Xây dựng diễn đàn học thuật cởi mở, kết nối chất xám phụng sự Tổ quốc."
        }
      ]
    },
    {
      id: 5,
      code: "STAGE_5",
      title: "CHẶNG 5: HƯỚNG VỀ CỘI NGUỒN",
      topic: "MẠNG LƯỚI YÊU THƯƠNG - NỐI MẠCH NGUỒN DÂN TỘC",
      badge: "Nối Mạch Nguồn Dân Tộc",
      background: "assets/images/real_bg_badinh.jpg",
      isNetworkStage: true,
      music: {
        id: "chang_5",
        title: "Khúc Ca Nối Mạch Nguồn Dân Tộc",
        author: "Âm vang Chặng 5",
        src: "assets/audio/chang_5.mp3",
        melodyKey: "nhu_co_bac_trong_ngay_dai_thang"
      },
      narrator: {
        name: "Tư tưởng Hồ Chí Minh",
        title: "Khúc Ruột Dặm Trường",
        avatar: "assets/images/ho_chi_minh_1946.jpg",
        avatarSource: "Ảnh tư liệu lịch sử (Wikimedia Commons)"
      },
      introDialogue: [
        {
          speaker: "Tư tưởng Hồ Chí Minh",
          text: "Chủ tịch Hồ Chí Minh luôn khẳng định: Kiều bào là 'khúc ruột dặm trường', là bộ phận máu thịt không thể tách rời của dân tộc Việt Nam. Dù ở bất cứ nơi đâu trên địa cầu, hơn 5,3 triệu đồng bào xa xứ vẫn luôn đau đáu hướng về quê hương.",
          quote: "Tổ quốc và Chính phủ luôn luôn nhớ thương các đồng bào, như bố mẹ nhớ thương những đứa con đi vắng."
        },
        {
          speaker: "Tư tưởng Hồ Chí Minh",
          text: "Trong kỷ nguyên số, không gian mạng chính là cầu nối xóa nhòa khoảng cách địa lý. Hãy xoay các khớp nối cáp quang để thông suốt 5 mạch nguồn kiều bào hòa cùng nhịp đập non sông!",
          quote: "Mỗi người con đất Việt ở hải ngoại đều là một đại sứ gắn kết, cùng chung tay xây dựng non sông gấm vóc."
        }
      ],
      scenarios: [
        {
          id: "5-1",
          scenarioIndex: 1,
          title: "Giữ gìn bản sắc và tiếng mẹ đẻ cho thế hệ tương lai",
          contextHeader: "MÀN 1 • KIỀU BÀO CHÂU ÂU",
          originStation: "Trạm Vệ Tinh Châu Âu",
          originFlag: "🇪🇺",
          targetStation: "Tâm Điểm Tổ Quốc Việt Nam",
          targetFlag: "🇻🇳",
          missionName: "Khai mở tiếng Việt số",
          issueText: "Nguy cơ thanh thiếu niên gốc Việt sinh ra và lớn lên ở nước ngoài dần mai một khả năng nói tiếng Việt và hiểu biết về cội nguồn.",
          gridRows: 3,
          gridCols: 4,
          startPos: { r: 0, c: 0, fromPort: 3 },
          endPos: { r: 2, c: 3, toPort: 1 },
          grid: [
            [
              { type: 'corner', rot: 1 },
              { type: 'straight', rot: 1 },
              { type: 'corner', rot: 3 },
              { type: 'straight', rot: 1 }
            ],
            [
              { type: 'corner', rot: 2 },
              { type: 'straight', rot: 1 },
              { type: 'corner', rot: 0 },
              { type: 'corner', rot: 3 }
            ],
            [
              { type: 'straight', rot: 1 },
              { type: 'corner', rot: 2 },
              { type: 'corner', rot: 3 },
              { type: 'straight', rot: 1 }
            ]
          ],
          quoteLesson: "Bác dạy: 'Tiếng nói là thứ của cải vô cùng lâu đời và quý báu của dân tộc'.",
          coreTakeaway: "Giữ gìn tiếng Việt qua các lớp học trực tuyến và thư viện số là giữ lấy sợi dây tâm hồn thiêng liêng nối các thế hệ kiều bào với đất mẹ."
        },
        {
          id: "5-2",
          scenarioIndex: 2,
          title: "Trí thức kiều bào hiến kế xây dựng non sông",
          contextHeader: "MÀN 2 • BẮC MỸ & SILICON VALLEY",
          originStation: "Trạm Vệ Tinh Bắc Mỹ",
          originFlag: "🇺🇸",
          targetStation: "Tâm Điểm Tổ Quốc Việt Nam",
          targetFlag: "🇻🇳",
          missionName: "Hiến kế non sông",
          issueText: "Vận dụng không gian mạng kết nối hơn 5,3 triệu người Việt ở nước ngoài mang lại lợi ích cốt lõi nào cho khối đại đoàn kết?",
          gridRows: 3,
          gridCols: 4,
          startPos: { r: 0, c: 0, fromPort: 3 },
          endPos: { r: 2, c: 3, toPort: 1 },
          grid: [
            [
              { type: 'straight', rot: 1 },
              { type: 'straight', rot: 1 },
              { type: 'corner', rot: 1 },
              { type: 'corner', rot: 0 }
            ],
            [
              { type: 'corner', rot: 3 },
              { type: 'straight', rot: 0 },
              { type: 'straight', rot: 0 },
              { type: 'straight', rot: 0 }
            ],
            [
              { type: 'straight', rot: 1 },
              { type: 'corner', rot: 1 },
              { type: 'corner', rot: 2 },
              { type: 'straight', rot: 1 }
            ]
          ],
          quoteLesson: "Đại đoàn kết là sức mạnh vô địch. Tri thức kiều bào là nguồn lực vô giá của non sông.",
          coreTakeaway: "Chính xác! Lợi ích cốt lõi là tạo môi trường số cởi mở để kiều bào đóng góp tri thức, chuyển giao công nghệ cao, hiến kế phát triển kinh tế - xã hội vì một Việt Nam hùng cường."
        },
        {
          id: "5-3",
          scenarioIndex: 3,
          title: "Nghĩa đồng bào vượt đại dương trong thiên tai bão lũ",
          contextHeader: "MÀN 3 • ĐÔNG BẮC Á",
          originStation: "Trạm Vệ Tinh Đông Bắc Á",
          originFlag: "🇯🇵",
          targetStation: "Tâm Điểm Tổ Quốc Việt Nam",
          targetFlag: "🇻🇳",
          missionName: "Một dải non sông - Triệu tấm lòng vàng",
          issueText: "Mỗi khi quê hương chịu ảnh hưởng của bão lũ, kiều bào đau đáu hướng về người thân nhưng gặp khó khăn về kênh quyên góp kịp thời và an toàn.",
          gridRows: 3,
          gridCols: 4,
          startPos: { r: 1, c: 0, fromPort: 3 },
          endPos: { r: 1, c: 3, toPort: 1 },
          grid: [
            [
              { type: 'corner', rot: 3 },
              { type: 'corner', rot: 0 },
              { type: 'straight', rot: 1 },
              { type: 'corner', rot: 1 }
            ],
            [
              { type: 'corner', rot: 1 },
              { type: 'corner', rot: 2 },
              { type: 'corner', rot: 0 },
              { type: 'straight', rot: 1 }
            ],
            [
              { type: 'straight', rot: 0 },
              { type: 'straight', rot: 0 },
              { type: 'corner', rot: 3 },
              { type: 'corner', rot: 1 }
            ]
          ],
          quoteLesson: "Nhiễu điều phủ lấy giá gương / Người trong một nước phải thương nhau cùng.",
          coreTakeaway: "Nền tảng số giúp tấm lòng cứu trợ của đồng bào xa xứ đến trực tiếp với bà con vùng khó khăn minh bạch, nhanh chóng và ấm áp nhất."
        },
        {
          id: "5-4",
          scenarioIndex: 4,
          title: "Doanh nhân kiều bào đưa nông sản, thương hiệu Việt ra thế giới",
          contextHeader: "MÀN 4 • KIỀU BÀO CHÂU ÚC",
          originStation: "Trạm Vệ Tinh Châu Úc",
          originFlag: "🇦🇺",
          targetStation: "Tâm Điểm Tổ Quốc Việt Nam",
          targetFlag: "🇻🇳",
          missionName: "Cầu nối giao thương Việt",
          issueText: "Nông sản, sản phẩm OCOP và văn hóa ẩm thực truyền thống trong nước muốn vươn ra thị trường toàn cầu nhưng thiếu kênh phân phối số tin cậy.",
          gridRows: 3,
          gridCols: 4,
          startPos: { r: 0, c: 0, fromPort: 3 },
          endPos: { r: 2, c: 3, toPort: 1 },
          grid: [
            [
              { type: 'straight', rot: 1 },
              { type: 'corner', rot: 0 },
              { type: 'straight', rot: 0 },
              { type: 'corner', rot: 3 }
            ],
            [
              { type: 'corner', rot: 1 },
              { type: 'corner', rot: 3 },
              { type: 'corner', rot: 0 },
              { type: 'straight', rot: 0 }
            ],
            [
              { type: 'straight', rot: 1 },
              { type: 'corner', rot: 2 },
              { type: 'corner', rot: 2 },
              { type: 'straight', rot: 1 }
            ]
          ],
          quoteLesson: "Bác khẳng định người Việt ở hải ngoại là sứ giả văn hóa và kinh tế của Tổ quốc.",
          coreTakeaway: "Mạng lưới thương mại điện tử xuyên biên giới do kiều bào làm cầu nối giúp đưa thương hiệu Việt Nam vươn tầm quốc tế."
        },
        {
          id: "5-5",
          scenarioIndex: 5,
          title: "Bảo vệ nền tảng tư tưởng và đấu tranh chính nghĩa từ hải ngoại",
          contextHeader: "MÀN 5 • KIỀU BÀO TOÀN CẦU",
          originStation: "Trạm Vệ Tinh Toàn Cầu",
          originFlag: "🌐",
          targetStation: "Tâm Điểm Tổ Quốc Việt Nam",
          targetFlag: "🇻🇳",
          missionName: "Lá chắn số kiều bào",
          issueText: "Các thế lực thù địch ở hải ngoại thường xuyên lập các diễn đàn xuyên tạc tình hình đất nước, bóp méo khối đại đoàn kết.",
          gridRows: 3,
          gridCols: 4,
          startPos: { r: 0, c: 0, fromPort: 3 },
          endPos: { r: 2, c: 3, toPort: 1 },
          grid: [
            [
              { type: 'straight', rot: 0 },
              { type: 'straight', rot: 0 },
              { type: 'corner', rot: 0 },
              { type: 'corner', rot: 3 }
            ],
            [
              { type: 'straight', rot: 0 },
              { type: 'corner', rot: 2 },
              { type: 'corner', rot: 1 },
              { type: 'corner', rot: 0 }
            ],
            [
              { type: 'corner', rot: 3 },
              { type: 'corner', rot: 2 },
              { type: 'straight', rot: 0 },
              { type: 'straight', rot: 0 }
            ]
          ],
          quoteLesson: "Sự thật và lòng yêu nước không có biên giới.",
          coreTakeaway: "Tiếng nói phản biện chính nghĩa của cộng đồng kiều bào yêu nước tại sở tại chính là tấm khiên vững chắc đập tan mọi luận điệu chia rẽ thù địch."
        }
      ]
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GAME_DATA;
}
