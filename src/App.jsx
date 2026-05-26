import { useState, useMemo } from "react";

const COLORS = {
  navy: "#0B2D6B",
  navyLight: "#1a3f8f",
  blue: "#1565C0",
  blueLight: "#1976D2",
  accent: "#2196F3",
  accentLight: "#E3F2FD",
  white: "#ffffff",
  bg: "#F4F6FA",
  border: "#E0E6F0",
  text: "#1a2340",
  textMuted: "#5A6880",
  success: "#2E7D32",
  successBg: "#E8F5E9",
  warning: "#E65100",
  warningBg: "#FFF3E0",
  danger: "#C62828",
  dangerBg: "#FFEBEE",
};

const mockProjects = [
  {
    id: "DA001",
    title: "Xây dựng Hệ thống quản lí quán café Times Coffee",
    student: "Vũ Xuân Trọng",
    studentId: "11235620",
    advisor: "Trịnh Hoài Sơn",
    semester: "Kỳ thu 2025",
    field: "Dịch vụ, Bán hàng",
    major: "Hệ thống thông tin quản lý",
    hasPdf: true,
    hasSlide: false,
    hasCode: true,
  },
  {
    id: "DA002",
    title: "Xây dựng ứng dụng QL đặt hàng cho CT CP sản xuất TLG VN",
    student: "Phạm Anh Tú",
    studentId: "11235621",
    advisor: "Phùng Tiến Hải",
    semester: "Kỳ thu 2025",
    field: "Bán hàng",
    major: "Hệ thống thông tin quản lý",
    hasPdf: true,
    hasSlide: false,
    hasCode: false,
  },
  {
    id: "DA003",
    title: "Xây dựng hệ thống điểm danh người học bằng nhận diện khuôn mặt",
    student: "Dương Thị Mai",
    studentId: "11235622",
    advisor: "Vũ Hưng Hải",
    semester: "Kỳ thu 2025",
    field: "Giáo dục, Bảo mật",
    major: "Hệ thống thông tin",
    hasPdf: true,
    hasSlide: true,
    hasCode: true,
  },
  {
    id: "DA004",
    title:
      "Xây dựng và thiết kế ứng dụng đặt lịch khám bệnh trực tuyến MediCare",
    student: "Trần Thế Anh",
    studentId: "11235623",
    advisor: "Trần Dũng Khánh",
    semester: "Kỳ xuân 2025",
    field: "Y tế",
    major: "Hệ thống thông tin quản lý",
    hasPdf: true,
    hasSlide: false,
    hasCode: true,
  },
  {
    id: "DA005",
    title:
      "Xây dựng website quản lí và bán hàng đồ gia dụng cho công ty Seven Home",
    student: "Phạm Hồng Sơn",
    studentId: "11235624",
    advisor: "Trần Thanh Hải",
    semester: "Kỳ xuân 2025",
    field: "Bán hàng",
    major: "Hệ thống thông tin quản lý",
    hasPdf: true,
    hasSlide: true,
    hasCode: false,
  },
  {
    id: "DA006",
    title:
      "Phân tích thiết kế phần mềm quản lý thông tin ứng viên tại Công ty Cổ phần Asia White Collar",
    student: "Lê Phương Anh",
    studentId: "11235625",
    advisor: "Trần Thị Bích Hạnh",
    semester: "Kỳ xuân 2025",
    field: "Nhân sự",
    major: "Hệ thống thông tin quản lý",
    hasPdf: true,
    hasSlide: true,
    hasCode: false,
  },
  {
    id: "DA007",
    title: "Hệ thống quản lý kho hàng thông minh cho doanh nghiệp vừa và nhỏ",
    student: "Nguyễn Minh Đức",
    studentId: "11235626",
    advisor: "Trịnh Hoài Sơn",
    semester: "Kỳ xuân 2025",
    field: "Nhân sự",
    major: "Hệ thống thông tin quản lý",
    hasPdf: true,
    hasSlide: false,
    hasCode: true,
  },
  {
    id: "DA008",
    title: "Ứng dụng AI hỗ trợ tư vấn học tập cho sinh viên đại học",
    student: "Hoàng Thu Hà",
    studentId: "11235627",
    advisor: "Vũ Hưng Hải",
    semester: "Kỳ hè 2025",
    field: "AI, bảo mật",
    major: "Hệ thống thông tin",
    hasPdf: true,
    hasSlide: true,
    hasCode: true,
  },
];

const mockAdvisors = [
  {
    name: "Trịnh Hoài Sơn",
    subjects: [
      "Phát triển các ứng dụng trong quản lý",
      "Cấu trúc dữ liệu và giải thuật",
      "Phát triển các hệ thống thông tin quản lý",
    ],
    count: 10,
  },
  {
    name: "Phùng Tiến Hải",
    subjects: [
      "Ngôn ngữ mô hình hóa thống nhất",
      "Quản trị dự án hệ thống thông tin",
    ],
    count: 12,
  },
  {
    name: "Vũ Hưng Hải",
    subjects: ["Hệ thống thông tin hỗ trợ ra quyết định"],
    count: 11,
  },
  { name: "Trần Dũng Khánh", subjects: ["Marketing trực tuyến"], count: 10 },
  { name: "Trần Thanh Hải", subjects: ["Ứng dụng cơ sở dữ liệu"], count: 12 },
  {
    name: "Trần Thị Bích Hạnh",
    subjects: ["Phân tích thiết kế hệ thống thông tin"],
    count: 9,
  },
];

const mockStudents = mockProjects.map((p) => ({
  id: p.studentId,
  name: p.student,
  project: p.title,
  semester: p.semester,
  major: p.major,
}));

const mockReports = [
  {
    id: "BC001",
    title:
      "Báo cáo Thống kê Danh sách Đồ án và Sinh viên thực hiện - Kỳ Xuân 2025",
    creator: "Nguyễn Văn A",
    time: "15:12 03/08/2025",
  },
  {
    id: "BC002",
    title:
      "Báo cáo Phân tích Xu hướng Đề tài theo Lĩnh vực Công nghệ - Kỳ Hè 2025",
    creator: "Trần Công B",
    time: "11:12 05/11/2025",
  },
  {
    id: "BC003",
    title: "Báo cáo định mức hướng dẫn của GVHD - Kỳ Thu 2025",
    creator: "Vũ Xuân C",
    time: "10:00 03/03/2026",
  },
];

const Sidebar = ({ active, onNav }) => {
  const items = [
    { id: "dashboard", icon: "⊞", label: "Tổng quan" },
    { id: "projects", icon: "📋", label: "Quản lý đồ án" },
    { id: "students", icon: "👤", label: "Quản lý sinh viên" },
    { id: "advisors", icon: "🎓", label: "Giáo viên hướng dẫn" },
    { id: "reports", icon: "📊", label: "Báo cáo" },
  ];
  return (
    <div
      style={{
        width: 220,
        minWidth: 220,
        minHeight: "100vh",
        background: COLORS.white,
        borderRight: `1px solid ${COLORS.border}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: "20px 16px",
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: COLORS.navy,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.white,
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          MIS
        </div>
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: COLORS.navy,
              letterSpacing: 0.5,
            }}
          >
            MIS
          </div>
          <div
            style={{ fontSize: 10, color: COLORS.textMuted, lineHeight: 1.3 }}
          >
            Khoa HTTTQL
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "12px 8px" }}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: active === item.id ? 600 : 400,
              background: active === item.id ? COLORS.navy : "transparent",
              color: active === item.id ? COLORS.white : COLORS.text,
              marginBottom: 2,
              textAlign: "left",
              transition: "all 0.15s",
            }}
          >
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

const TopBar = ({ title }) => (
  <div
    style={{
      height: 56,
      background: COLORS.navy,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      flexShrink: 0,
    }}
  >
    <span style={{ color: COLORS.white, fontSize: 16, fontWeight: 600 }}>
      {title}
    </span>
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ position: "relative" }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <span style={{ color: COLORS.white, fontSize: 16 }}>🔔</span>
        </div>
        <div
          style={{
            position: "absolute",
            top: -2,
            right: -2,
            background: "#f44336",
            borderRadius: "50%",
            width: 16,
            height: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            color: COLORS.white,
            fontWeight: 700,
          }}
        >
          6
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#FF9800",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.white,
            fontWeight: 700,
            fontSize: 12,
          }}
        >
          NV
        </div>
        <div>
          <div style={{ color: COLORS.white, fontSize: 12, fontWeight: 600 }}>
            Nguyễn Văn A
          </div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 10 }}>
            Admin
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StatCard = ({ label, value, icon, color }) => (
  <div
    style={{
      background: COLORS.white,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 12,
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }}
  >
    <div style={{ fontSize: 13, color: COLORS.textMuted }}>{label}</div>
    <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.navy }}>
      {value}
    </div>
  </div>
);

const SimpleBarChart = ({ data }) => {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div style={{ padding: "8px 0" }}>
      {data.map((d, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: 140,
              fontSize: 12,
              color: COLORS.textMuted,
              textAlign: "right",
              flexShrink: 0,
            }}
          >
            {d.label}
          </div>
          <div
            style={{
              flex: 1,
              height: 28,
              background: COLORS.bg,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(d.value / max) * 100}%`,
                height: "100%",
                background: COLORS.blue,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                paddingLeft: 8,
              }}
            >
              <span
                style={{ color: COLORS.white, fontSize: 12, fontWeight: 600 }}
              >
                {d.value}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const PieChart = ({ data }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const slices = data.map((d, i) => {
    const pct = d.value / total;
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    cumulative += pct;
    const endAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    const r = 80;
    const cx = 100,
      cy = 100;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const large = pct > 0.5 ? 1 : 0;
    const colors = [
      COLORS.navy,
      COLORS.accentLight.replace("E3F2FD", "90CAF9"),
    ];
    return {
      path: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`,
      color: i === 0 ? COLORS.navy : "#90CAF9",
      pct: Math.round(pct * 100),
      label: d.label,
    };
  });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        justifyContent: "center",
      }}
    >
      <svg width={200} height={200} viewBox="0 0 200 200">
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} />
        ))}
        {slices.map((s, i) => {
          const mid =
            (i === 0 ? s.pct / 200 : slices[0].pct / 100 + s.pct / 200) *
              2 *
              Math.PI -
            Math.PI / 2;
          const tr = 55;
          return (
            <text
              key={i}
              x={100 + tr * Math.cos(mid)}
              y={100 + tr * Math.sin(mid)}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={11}
              fontWeight={600}
            >
              {s.pct}%
            </text>
          );
        })}
      </svg>
      <div>
        {slices.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                background: s.color,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 12, color: COLORS.textMuted }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => (
  <div style={{ padding: 24, flex: 1, overflow: "auto" }}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        marginBottom: 24,
      }}
    >
      <StatCard label="Tổng Đồ án" value="1,000" />
      <StatCard label="Tổng Sinh viên" value="120" />
      <StatCard label="Tổng GVHD" value="30" />
    </div>
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "flex-start",
        marginBottom: 16,
      }}
    >
      <div
        style={{ background: COLORS.bg, borderRadius: 8, padding: "8px 16px" }}
      >
        <span style={{ fontSize: 12, color: COLORS.textMuted, marginRight: 8 }}>
          Năm học
        </span>
        <select
          style={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: 6,
            padding: "4px 8px",
            fontSize: 12,
          }}
        >
          <option>2025–2026</option>
        </select>
      </div>
      <div
        style={{ background: COLORS.bg, borderRadius: 8, padding: "8px 16px" }}
      >
        <span style={{ fontSize: 12, color: COLORS.textMuted, marginRight: 8 }}>
          Kỳ học
        </span>
        <select
          style={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: 6,
            padding: "4px 8px",
            fontSize: 12,
          }}
        >
          <option>Kỳ xuân 2025</option>
        </select>
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
      <div
        style={{
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          padding: 20,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: COLORS.text,
            marginBottom: 16,
          }}
        >
          Xu hướng lĩnh vực nghiên cứu
        </div>
        <SimpleBarChart
          data={[
            { label: "Nhân sự", value: 12 },
            { label: "Bán hàng", value: 25 },
            { label: "Giáo dục", value: 18 },
            { label: "Y tế", value: 35 },
            { label: "Kinh doanh khách sạn", value: 28 },
          ]}
        />
      </div>
      <div
        style={{
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          padding: 20,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: COLORS.text,
            marginBottom: 16,
          }}
        >
          Số lượng đồ án theo ngành
        </div>
        <PieChart
          data={[
            { label: "HTTTQL", value: 90 },
            { label: "HTTT", value: 40 },
          ]}
        />
      </div>
    </div>
  </div>
);

const Badge = ({
  text,
  color = COLORS.accentLight,
  textColor = COLORS.blue,
}) => (
  <span
    style={{
      background: color,
      color: textColor,
      fontSize: 11,
      padding: "2px 8px",
      borderRadius: 12,
      fontWeight: 500,
    }}
  >
    {text}
  </span>
);

const IconBtn = ({ title, onClick, color = COLORS.blue }) => (
  <button
    onClick={onClick}
    title={title}
    style={{
      width: 30,
      height: 30,
      borderRadius: 8,
      border: `1px solid ${color}30`,
      background: `${color}15`,
      color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: 14,
      flexShrink: 0,
    }}
  >
    👁
  </button>
);

const Modal = ({ title, onClose, children, width = 560 }) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
    }}
  >
    <div
      style={{
        background: COLORS.white,
        borderRadius: 12,
        width,
        maxWidth: "95vw",
        maxHeight: "90vh",
        overflow: "auto",
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
      }}
    >
      <div
        style={{
          padding: "20px 24px",
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, color: COLORS.navy }}>
          {title}
        </span>
        <button
          onClick={onClose}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: 18,
            color: COLORS.textMuted,
          }}
        >
          ✕
        </button>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  </div>
);

const FormField = ({ label, required, children }) => (
  <div style={{ marginBottom: 16 }}>
    <label
      style={{
        display: "block",
        fontSize: 13,
        fontWeight: 500,
        color: COLORS.text,
        marginBottom: 6,
      }}
    >
      {label}
      {required && <span style={{ color: COLORS.danger }}> *</span>}
    </label>
    {children}
  </div>
);

const Input = ({ placeholder, value, onChange, disabled }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    style={{
      width: "100%",
      border: `1px solid ${COLORS.border}`,
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 13,
      color: COLORS.text,
      background: disabled ? COLORS.bg : COLORS.white,
      boxSizing: "border-box",
    }}
  />
);

const Select = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={onChange}
    style={{
      width: "100%",
      border: `1px solid ${COLORS.border}`,
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 13,
      color: COLORS.text,
      background: COLORS.white,
    }}
  >
    {options.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);

const UploadField = ({ label, required, filename }) => (
  <FormField label={label} required={required}>
    <div
      style={{
        border: `1px dashed ${COLORS.border}`,
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 13,
        color: filename ? COLORS.text : COLORS.textMuted,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        background: COLORS.bg,
      }}
    >
      <span>{filename || "Bấm hoặc kéo thả vào..."}</span>
      <span style={{ color: COLORS.blue, fontSize: 16 }}>↑</span>
    </div>
  </FormField>
);

function ProjectModal({ project, onClose, mode }) {
  const [form, setForm] = useState(
    project || {
      title: "",
      field: "",
      studentId: "",
      studentName: "",
      advisorName: "",
      semester: "Kỳ xuân 2025",
      yearGroup: "2025-2026",
    },
  );
  const isEdit = mode === "edit";
  return (
    <Modal title="Thông tin đồ án" onClose={onClose}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <FormField label="Mã đồ án">
          <Input value={isEdit ? project.id : "DA009"} disabled />
        </FormField>
        <FormField label="Năm học">
          <Select
            value={form.yearGroup}
            onChange={(e) => setForm({ ...form, yearGroup: e.target.value })}
            options={[
              { value: "2025-2026", label: "2025–2026" },
              { value: "2024-2025", label: "2024–2025" },
            ]}
          />
        </FormField>
        <FormField label="Kỳ học">
          <Select
            value={form.semester}
            onChange={(e) => setForm({ ...form, semester: e.target.value })}
            options={["Kỳ xuân 2025", "Kỳ thu 2025", "Kỳ hè 2025"].map((s) => ({
              value: s,
              label: s,
            }))}
          />
        </FormField>
      </div>
      <FormField label="Tên đồ án">
        <Input
          placeholder="Nhập tên đồ án..."
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </FormField>
      <FormField label="Lĩnh vực">
        <Input
          placeholder="Lựa chọn hoặc nhập lĩnh vực..."
          value={form.field}
          onChange={(e) => setForm({ ...form, field: e.target.value })}
        />
      </FormField>
      <UploadField
        label="File PDF"
        required
        filename={
          isEdit && project.hasPdf
            ? `${project.studentId}_${project.student?.replace(/\s/g, "")}.pdf`
            : ""
        }
      />
      <UploadField label="Slide" filename="" />
      <UploadField
        label="Source code"
        filename={
          isEdit && project.hasCode ? `${project.studentId}_code.zip` : ""
        }
      />
      <div
        style={{
          borderTop: `1px solid ${COLORS.border}`,
          paddingTop: 16,
          marginTop: 4,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: COLORS.blue,
            marginBottom: 12,
          }}
        >
          Thông tin sinh viên
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          <FormField label="Mã sinh viên">
            <Input
              placeholder="Nhập mã sinh viên..."
              value={isEdit ? project.studentId : form.studentId}
              onChange={(e) => setForm({ ...form, studentId: e.target.value })}
            />
          </FormField>
          <FormField label="Tên sinh viên">
            <Input
              placeholder="Nhập tên sinh viên..."
              value={isEdit ? project.student : form.studentName}
              onChange={(e) =>
                setForm({ ...form, studentName: e.target.value })
              }
            />
          </FormField>
        </div>
      </div>
      <div
        style={{
          borderTop: `1px solid ${COLORS.border}`,
          paddingTop: 16,
          marginTop: 4,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: COLORS.blue,
            marginBottom: 12,
          }}
        >
          Thông tin GVHD
        </div>
        <FormField label="Tên GVHD">
          <Input
            placeholder="Nhập tên GVHD..."
            value={isEdit ? project.advisor : form.advisorName}
            onChange={(e) => setForm({ ...form, advisorName: e.target.value })}
          />
        </FormField>
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}
      >
        <button
          onClick={onClose}
          style={{
            background: COLORS.navy,
            color: COLORS.white,
            border: "none",
            borderRadius: 8,
            padding: "10px 24px",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          {isEdit ? "Cập nhật" : "+ Thêm mới"}
        </button>
      </div>
    </Modal>
  );
}

const Projects = () => {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("2025-2026");
  const [semesterFilter, setSemesterFilter] = useState("Kỳ thu 2025");
  const [majorFilter, setMajorFilter] = useState("Hệ thống thông tin quản lý");
  const [modal, setModal] = useState(null);
  const filtered = useMemo(
    () =>
      mockProjects.filter(
        (p) =>
          !search ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.student.toLowerCase().includes(search.toLowerCase()) ||
          p.advisor.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <div style={{ padding: 24, flex: 1, overflow: "auto" }}>
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 16,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          placeholder="Tìm kiếm tên đồ án, tên sinh viên, GVHD, lĩnh vực..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 280,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "8px 14px",
            fontSize: 13,
          }}
        />
        <select
          value={majorFilter}
          onChange={(e) => setMajorFilter(e.target.value)}
          style={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 13,
          }}
        >
          <option>Hệ thống thông tin quản lý</option>
          <option>Hệ thống thông tin</option>
        </select>
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          style={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 13,
          }}
        >
          <option>2025–2026</option>
          <option>2024–2025</option>
        </select>
        <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          style={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 13,
          }}
        >
          <option>Kỳ xuân 2025</option>
          <option>Kỳ thu 2025</option>
          <option>Kỳ hè 2025</option>
        </select>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <button
          onClick={() => setModal({ mode: "add" })}
          style={{
            background: COLORS.navy,
            color: COLORS.white,
            border: "none",
            borderRadius: 8,
            padding: "8px 18px",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          + Thêm mới
        </button>
        <button
          style={{
            background: COLORS.white,
            color: COLORS.text,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "8px 18px",
            fontWeight: 500,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          ↓ Xuất Excel
        </button>
      </div>
      <div
        style={{
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
        >
          <thead>
            <tr style={{ background: COLORS.navy }}>
              {[
                "Mã đồ án",
                "Tên đồ án",
                "Tên sinh viên",
                "GVHD",
                "Kỳ học",
                "Lĩnh vực",
                "File PDF",
                "Slide",
                "Source code",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    color: COLORS.white,
                    fontWeight: 600,
                    padding: "12px 12px",
                    textAlign: "left",
                    fontSize: 12,
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr
                key={p.id}
                style={{
                  borderBottom: `1px solid ${COLORS.border}`,
                  background: i % 2 === 0 ? COLORS.white : COLORS.bg,
                }}
              >
                <td
                  style={{
                    padding: "10px 12px",
                    fontWeight: 600,
                    color: COLORS.blue,
                  }}
                >
                  {p.id}
                </td>
                <td style={{ padding: "10px 12px", maxWidth: 220 }}>
                  <span
                    style={{ cursor: "pointer", color: COLORS.text }}
                    onClick={() => setModal({ mode: "edit", project: p })}
                  >
                    {p.title}
                  </span>
                </td>
                <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                  {p.student}
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    whiteSpace: "nowrap",
                    color: COLORS.textMuted,
                  }}
                >
                  {p.advisor}
                </td>
                <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                  <Badge text={p.semester} />
                </td>
                <td style={{ padding: "10px 12px" }}>{p.field}</td>
                <td style={{ padding: "10px 12px", textAlign: "center" }}>
                  {p.hasPdf && <IconBtn title="Xem PDF" onClick={() => {}} />}
                </td>
                <td style={{ padding: "10px 12px", textAlign: "center" }}>
                  {p.hasSlide && (
                    <IconBtn
                      title="Xem Slide"
                      onClick={() => {}}
                      color="#7B1FA2"
                    />
                  )}
                </td>
                <td style={{ padding: "10px 12px", textAlign: "center" }}>
                  {p.hasCode && (
                    <IconBtn
                      title="Xem Source"
                      onClick={() => {}}
                      color="#2E7D32"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            padding: "12px 16px",
            borderTop: `1px solid ${COLORS.border}`,
            display: "flex",
            gap: 6,
            justifyContent: "center",
          }}
        >
          {[1, 2, 3, 4, "...", 7].map((p, i) => (
            <button
              key={i}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: `1px solid ${p === 1 ? COLORS.navy : COLORS.border}`,
                background: p === 1 ? COLORS.navy : COLORS.white,
                color: p === 1 ? COLORS.white : COLORS.text,
                fontWeight: p === 1 ? 600 : 400,
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      {modal && (
        <ProjectModal
          project={modal.project}
          mode={modal.mode}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};

const Students = () => {
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("Tất cả");
  const filtered = useMemo(
    () =>
      mockStudents.filter(
        (s) =>
          !search ||
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.id.includes(search),
      ),
    [search],
  );
  return (
    <div style={{ padding: 24, flex: 1, overflow: "auto" }}>
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 16,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="Tìm kiếm tên sinh viên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 240,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "8px 14px",
            fontSize: 13,
          }}
        />
        <select
          style={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 13,
          }}
        >
          <option>Hệ thống thông tin quản lý</option>
        </select>
        <select
          style={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 13,
          }}
        >
          <option>2025–2026</option>
        </select>
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          style={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 13,
          }}
        >
          <option>Tất cả</option>
          <option>Kỳ xuân 2025</option>
          <option>Kỳ thu 2025</option>
        </select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <button
          style={{
            background: COLORS.white,
            color: COLORS.text,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "8px 18px",
            fontWeight: 500,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          ↓ Xuất Excel
        </button>
      </div>
      <div
        style={{
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
        >
          <thead>
            <tr style={{ background: COLORS.navy }}>
              {["Mã sinh viên", "Tên sinh viên", "Tên đồ án", "Kỳ học"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      color: COLORS.white,
                      fontWeight: 600,
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: 12,
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr
                key={s.id}
                style={{
                  borderBottom: `1px solid ${COLORS.border}`,
                  background: i % 2 === 0 ? COLORS.white : COLORS.bg,
                }}
              >
                <td
                  style={{
                    padding: "10px 16px",
                    fontWeight: 600,
                    color: COLORS.blue,
                  }}
                >
                  {s.id}
                </td>
                <td style={{ padding: "10px 16px", fontWeight: 500 }}>
                  {s.name}
                </td>
                <td style={{ padding: "10px 16px", color: COLORS.textMuted }}>
                  {s.project}
                </td>
                <td style={{ padding: "10px 16px" }}>
                  <Badge text={s.semester} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            padding: "12px 16px",
            borderTop: `1px solid ${COLORS.border}`,
            display: "flex",
            gap: 6,
            justifyContent: "center",
          }}
        >
          {[1, 2, 3, 4, "...", 7].map((p, i) => (
            <button
              key={i}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: `1px solid ${p === 1 ? COLORS.navy : COLORS.border}`,
                background: p === 1 ? COLORS.navy : COLORS.white,
                color: p === 1 ? COLORS.white : COLORS.text,
                fontWeight: p === 1 ? 600 : 400,
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Advisors = () => {
  const [detailAdvisor, setDetailAdvisor] = useState(null);
  return (
    <div style={{ padding: 24, flex: 1, overflow: "auto" }}>
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 16,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="Tìm kiếm tên sinh viên..."
          style={{
            flex: 1,
            minWidth: 240,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "8px 14px",
            fontSize: 13,
          }}
        />
        <select
          style={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 13,
          }}
        >
          <option>2025–2026</option>
        </select>
        <select
          style={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 13,
          }}
        >
          <option>Kỳ xuân 2025</option>
          <option>Kỳ thu 2025</option>
        </select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <button
          style={{
            background: COLORS.white,
            color: COLORS.text,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "8px 18px",
            fontWeight: 500,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          ↓ Xuất Excel
        </button>
      </div>
      <div
        style={{
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
        >
          <thead>
            <tr style={{ background: COLORS.navy }}>
              {[
                "Tên GVHD",
                "Bộ môn",
                "Số lượng đồ án đã hướng dẫn",
                "Chi tiết",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    color: COLORS.white,
                    fontWeight: 600,
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: 12,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockAdvisors.map((a, i) => (
              <tr
                key={a.name}
                style={{
                  borderBottom: `1px solid ${COLORS.border}`,
                  background: i % 2 === 0 ? COLORS.white : COLORS.bg,
                }}
              >
                <td style={{ padding: "12px 16px", fontWeight: 600 }}>
                  {a.name}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: COLORS.textMuted,
                    lineHeight: 1.6,
                  }}
                >
                  {a.subjects.map((s, si) => (
                    <div key={si}>{s}</div>
                  ))}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: 700,
                    color: COLORS.navy,
                  }}
                >
                  {a.count}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <button
                    onClick={() => setDetailAdvisor(a)}
                    style={{
                      background: "none",
                      border: "none",
                      color: COLORS.blue,
                      cursor: "pointer",
                      fontStyle: "italic",
                      fontSize: 13,
                    }}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            padding: "12px 16px",
            borderTop: `1px solid ${COLORS.border}`,
            display: "flex",
            gap: 6,
            justifyContent: "center",
          }}
        >
          {[1, 2, 3, 4, "...", 7].map((p, i) => (
            <button
              key={i}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: `1px solid ${p === 1 ? COLORS.navy : COLORS.border}`,
                background: p === 1 ? COLORS.navy : COLORS.white,
                color: p === 1 ? COLORS.white : COLORS.text,
                fontWeight: p === 1 ? 600 : 400,
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      {detailAdvisor && (
        <Modal
          title="Đồ án đã hướng dẫn"
          onClose={() => setDetailAdvisor(null)}
          width={520}
        >
          {mockProjects.slice(0, 6).map((p, i) => (
            <div
              key={i}
              style={{
                padding: "12px 0",
                borderBottom: i < 5 ? `1px solid ${COLORS.border}` : "none",
                fontSize: 14,
                color: COLORS.text,
              }}
            >
              {p.title}
            </div>
          ))}
        </Modal>
      )}
    </div>
  );
};

const Reports = () => {
  const [view, setView] = useState("list");
  const [reportType, setReportType] = useState("Đồ án tốt nghiệp");
  const [displayCount, setDisplayCount] = useState("2");
  const [semester, setSemester] = useState("Tất cả");

  const previewData = [
    { major: "Hệ thống thông tin quản lý", count: 120 },
    { major: "Hệ thống thông tin", count: 50 },
  ];

  if (view === "create") {
    return (
      <div style={{ padding: 24, flex: 1, overflow: "auto" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: COLORS.navy,
              marginBottom: 20,
            }}
          >
            Nhập thông tin báo cáo
          </h2>
          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: COLORS.textMuted,
                  marginBottom: 6,
                }}
              >
                Loại báo cáo
              </div>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                style={{
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 13,
                  minWidth: 180,
                }}
              >
                <option>Đồ án tốt nghiệp</option>
                <option>Lĩnh vực nghiên cứu</option>
                <option>Theo GVHD</option>
              </select>
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: COLORS.textMuted,
                  marginBottom: 6,
                }}
              >
                Số lượng hiển thị
              </div>
              <input
                type="number"
                value={displayCount}
                onChange={(e) => setDisplayCount(e.target.value)}
                style={{
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 13,
                  width: 80,
                }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: COLORS.textMuted,
                  marginBottom: 6,
                }}
              >
                Kỳ học
              </div>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                style={{
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 13,
                  minWidth: 120,
                }}
              >
                <option>Tất cả</option>
                <option>Tùy chọn</option>
                <option>Kỳ xuân 2025</option>
                <option>Kỳ thu 2025</option>
              </select>
            </div>
          </div>
          <div
            style={{ marginBottom: 4, fontSize: 12, color: COLORS.textMuted }}
          >
            Tên báo cáo
          </div>
          <input
            value="Báo cáo số lượng đồ án tốt nghiệp theo chuyên ngành"
            readOnly
            style={{
              width: "100%",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 8,
              padding: "8px 14px",
              fontSize: 13,
              marginBottom: 20,
              background: COLORS.bg,
              color: COLORS.textMuted,
              boxSizing: "border-box",
            }}
          />
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>
            Xem trước báo cáo
          </h3>
          <div
            style={{
              border: `1px solid ${COLORS.border}`,
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            <div style={{ padding: 32, background: COLORS.white }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: COLORS.navy,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: COLORS.white,
                    fontWeight: 700,
                    fontSize: 11,
                  }}
                >
                  MIS
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: COLORS.navy,
                    }}
                  >
                    MIS
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted }}>
                    Khoa Hệ thống thông tin quản lý
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: COLORS.textMuted,
                  marginBottom: 24,
                }}
              >
                Đại học Kinh tế Quốc Dân
                <br />
                Địa chỉ: P. 1308 – P.1309, Tòa A1, ĐHKTQD, 207 Giải Phóng,
                <br />
                Quận Hai Bà Trưng, Hà Nội
                <br />
                Điện thoại: 096.550.9888
              </div>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div
                  style={{ fontWeight: 700, fontSize: 16, color: COLORS.text }}
                >
                  BÁO CÁO SỐ LƯỢNG ĐỒ ÁN TỐT NGHIỆP
                </div>
                <div
                  style={{ fontWeight: 700, fontSize: 16, color: COLORS.text }}
                >
                  THEO CHUYÊN NGÀNH
                </div>
              </div>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                  marginBottom: 24,
                }}
              >
                <thead>
                  <tr style={{ background: COLORS.navy }}>
                    <th
                      style={{
                        color: COLORS.white,
                        padding: "8px 12px",
                        textAlign: "left",
                        fontWeight: 600,
                        width: 40,
                      }}
                    >
                      STT
                    </th>
                    <th
                      style={{
                        color: COLORS.white,
                        padding: "8px 12px",
                        textAlign: "left",
                        fontWeight: 600,
                      }}
                    >
                      Chuyên ngành
                    </th>
                    <th
                      style={{
                        color: COLORS.white,
                        padding: "8px 12px",
                        textAlign: "center",
                        fontWeight: 600,
                      }}
                    >
                      Số lượng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, i) => (
                    <tr
                      key={i}
                      style={{ borderBottom: `1px solid ${COLORS.border}` }}
                    >
                      <td style={{ padding: "8px 12px" }}>{i + 1}</td>
                      <td style={{ padding: "8px 12px" }}>{row.major}</td>
                      <td style={{ padding: "8px 12px", textAlign: "center" }}>
                        {row.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 16,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>
                    Trưởng khoa
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: COLORS.textMuted,
                      fontStyle: "italic",
                    }}
                  >
                    (Ký và ghi rõ họ tên)
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 13, marginBottom: 4 }}>
                    Hà Nội , ngày 08 tháng 04 năm 2026
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>
                    Người lập báo cáo
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: COLORS.textMuted,
                      fontStyle: "italic",
                    }}
                  >
                    (Ký và ghi rõ họ tên)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={() => setView("list")}
              style={{
                background: COLORS.white,
                color: COLORS.text,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: "10px 24px",
                fontWeight: 500,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              ← Quay lại
            </button>
            <button
              style={{
                background: COLORS.navy,
                color: COLORS.white,
                border: "none",
                borderRadius: 8,
                padding: "10px 24px",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Xuất báo cáo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, flex: 1, overflow: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: COLORS.navy,
            margin: 0,
          }}
        >
          Lịch sử báo cáo
        </h2>
        <button
          onClick={() => setView("create")}
          style={{
            background: COLORS.navy,
            color: COLORS.white,
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          + Tạo báo cáo mới
        </button>
      </div>
      <div
        style={{
          background: COLORS.white,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
        >
          <thead>
            <tr style={{ background: COLORS.navy }}>
              {["Mã báo cáo", "Tên báo cáo", "Người tạo", "Thời gian"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      color: COLORS.white,
                      fontWeight: 600,
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: 12,
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {mockReports.map((r, i) => (
              <tr
                key={r.id}
                style={{
                  borderBottom: `1px solid ${COLORS.border}`,
                  background: i % 2 === 0 ? COLORS.white : COLORS.bg,
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    fontWeight: 600,
                    color: COLORS.blue,
                  }}
                >
                  {r.id}
                </td>
                <td style={{ padding: "12px 16px" }}>{r.title}</td>
                <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                  {r.creator}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    whiteSpace: "nowrap",
                    color: COLORS.textMuted,
                  }}
                >
                  {r.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function App() {
  const [page, setPage] = useState("dashboard");

  const pages = {
    dashboard: {
      title: "Khoa Hệ thống thông tin quản lý - NEU",
      component: <Dashboard />,
    },
    projects: {
      title: "Khoa Hệ thống thông tin quản lý - NEU",
      component: <Projects />,
    },
    students: {
      title: "Khoa Hệ thống thông tin quản lý - NEU",
      component: <Students />,
    },
    advisors: {
      title: "Khoa Hệ thống thông tin quản lý - NEU",
      component: <Advisors />,
    },
    reports: {
      title: "Khoa Hệ thống thông tin quản lý - NEU",
      component: <Reports />,
    },
  };

  const current = pages[page];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        background: COLORS.bg,
        overflow: "hidden",
      }}
    >
      <Sidebar active={page} onNav={setPage} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <TopBar title={current.title} />
        <div style={{ flex: 1, overflow: "auto" }}>{current.component}</div>
      </div>
    </div>
  );
}
