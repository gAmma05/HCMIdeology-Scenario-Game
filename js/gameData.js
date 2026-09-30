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
      narrator: {
        name: "Chủ tịch Hồ Chí Minh",
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
          speaker: "Chủ tịch Hồ Chí Minh",
          text: "Chủ tịch Hồ Chí Minh đã đúc kết bài học lịch sử của dân tộc ta thành chân lý bất hủ:",
          quote: "Đoàn kết, đoàn kết, đại đoàn kết\nThành công, thành công, đại thành công."
        }
      ],
      scenarios: [
        {
          id: "1-1",
          scenarioIndex: 1,
          contextHeader: "TÌNH HUỐNG 1",
          quoteContext: "Lúc nào dân ta đoàn kết muôn người như một thì nước ta độc lập, tự do.",
          question: "Dựa trên lời dạy của Bác: \"Lúc nào dân ta đoàn kết muôn người như một thì nước ta độc lập, tự do\", điều gì sẽ xảy ra nếu dân ta không đoàn kết?",
          options: [
            {
              id: "A",
              text: "Mất đi mục tiêu, nhiệm vụ hàng đầu của Đảng trong việc phụng sự Tổ quốc.",
              isCorrect: false,
              feedbackText: "Lựa chọn chưa đúng. Các đáp án này nói về nhiệm vụ của Đảng, an ninh mạng hoặc đoàn kết quốc tế, trong khi Bác trực tiếp cảnh báo nguy cơ bị nước ngoài xâm lấn khi mất đoàn kết."
            },
            {
              id: "B",
              text: "Bị nước ngoài xâm lấn.",
              isCorrect: true,
              feedbackText: "Chính xác! Bác khẳng định: Trái lại lúc nào dân ta không đoàn kết thì bị nước ngoài xâm lấn."
            },
            {
              id: "C",
              text: "Bị lệ thuộc hay thao túng bởi các thế lực bên ngoài trên không gian mạng.",
              isCorrect: false,
              feedbackText: "Lựa chọn chưa đúng. Các đáp án này nói về nhiệm vụ của Đảng, an ninh mạng hoặc đoàn kết quốc tế, trong khi Bác trực tiếp cảnh báo nguy cơ bị nước ngoài xâm lấn khi mất đoàn kết."
            },
            {
              id: "D",
              text: "Sẽ không thể kết hợp được sức mạnh dân tộc với sức mạnh thời đại.",
              isCorrect: false,
              feedbackText: "Lựa chọn chưa đúng. Các đáp án này nói về nhiệm vụ của Đảng, an ninh mạng hoặc đoàn kết quốc tế, trong khi Bác trực tiếp cảnh báo nguy cơ bị nước ngoài xâm lấn khi mất đoàn kết."
            }
          ],
          correctOptionId: "B",
          points: 10,
          coreTakeaway: {
            title: "TƯ TƯỞNG CỐT LÕI",
            content: "Đại đoàn kết toàn dân tộc là sức mạnh quyết định thắng lợi cách mạng. Khi khối đại đoàn kết bị suy yếu, quốc gia sẽ đứng trước nguy cơ bị ngoại xâm và mất quyền độc lập, tự do.",
            reference: "Trích: Hồ Chí Minh Toàn tập, Tập 3, NXB Chính trị quốc gia Sự thật"
          }
        }
      ]
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GAME_DATA;
}
