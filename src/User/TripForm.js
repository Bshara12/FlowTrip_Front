import React, { useState } from "react";
import "./TripForm.css"; // استدعاء الستايل المستقل

export default function TripForm() {
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("medium");
  const [description, setDescription] = useState("");

  const budgetMessages = {
    low: "أصلاً المصاري مو كلشي 😁",
    medium: "نمشيها عالبركة ونكمل 🤷‍♂️",
    high: "مرتااااح يا عمي 😉",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ days, budget, description });
    alert("تم حفظ البيانات 🚀");
  };

  return (
    <div className="trip-form-container">
      <div className="form-header">🗓 خطط رحلتك</div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>📅 عدد الأيام</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="أدخل عدد الأيام"
            required
          />
        </div>

        <div className="form-group">
          <label>💰 الميزانية</label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="low">ضعيفة</option>
            <option value="medium">متوسطة</option>
            <option value="high">مرتفعة</option>
          </select>
          <p className="budget-msg">{budgetMessages[budget]}</p>
        </div>

        <div className="form-group">
          <label>📝 الوصف</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="أضف وصف الرحلة"
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" className="send-btn">حفظ</button>
      </form>
    </div>
  );
}