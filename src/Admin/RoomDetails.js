import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./OwnerDetails.css";
import "./RoomDetails.css";
import ConfirmDialog from "../Component/ConfirmDialog";
import Loader from "../Component/Loader";


export default function RoomDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [deletedPictures, setDeletedPictures] = useState([]);
  const [currentPictures, setCurrentPictures] = useState([]); // الصور الحالية
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  const token = "G3SNaKPlCWuy2mAbgxSgpq7zz8BaVh2w7oSsRuxwec6795ec";

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/ShowRoom/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data);
        setCurrentPictures(res.data.pictures);
        setEditData({
          price: res.data.room.price,
          offer_price: res.data.room.offer_price || "",
          area: res.data.room.area,
          people_count: res.data.room.people_count,
          description: res.data.room.description,
          pictures: res.data.pictures,
        });
      } catch (err) {
        setError("حدث خطأ أثناء جلب بيانات الغرفة");
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  useEffect(() => {
    if (!sliderRef.current) return;
    if (isPaused) return;
    if (!data || !data.pictures) return;
    if (data.pictures.length < 2) return; // Disable auto-scroll if less than 6 images
    const slider = sliderRef.current;
    const scrollAmount = 1;

    const card = slider.querySelector(".room-picture-card");
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 20;
    const originalPicturesLength = data.pictures.length;
    const totalWidth = originalPicturesLength * (cardWidth + gap);

    let isResetting = false;
    const interval = setInterval(() => {
      if (isResetting) return;
      if (slider.scrollLeft >= totalWidth) {
        isResetting = true;
        slider.style.scrollBehavior = "auto";
        slider.scrollLeft = 0;
        setTimeout(() => {
          slider.style.scrollBehavior = "smooth";
          isResetting = false;
        }, 20);
      } else {
        slider.scrollLeft += scrollAmount;
      }
    }, 16);
    slider._interval = interval;

    return () => {
      if (slider._interval) clearInterval(slider._interval);
    };
  }, [isPaused, data]);

  const scrollSlider = (dir) => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const card = slider.querySelector(".room-picture-card");
    const cardWidth = card ? card.offsetWidth : 220;
    const gap = 20;
    const amount = cardWidth + gap;
    slider.scrollLeft += dir === "left" ? -amount : amount;
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePictureDelete = (pictureId) => {
    // البحث في الصور الحالية
    const pictureToDelete = currentPictures.find((pic) => pic.id === pictureId);

    if (pictureToDelete) {
      // إذا كانت صورة جديدة، قم بحذف URL المؤقت
      if (pictureToDelete.isNew) {
        URL.revokeObjectURL(pictureToDelete.room_picture);
      } else {
        // إذا كانت صورة موجودة، أضفها لقائمة الصور المحذوفة
        setDeletedPictures((prev) => [...prev, pictureToDelete]);
      }

      // إزالة من الصور الحالية
      setCurrentPictures((prev) => prev.filter((pic) => pic.id !== pictureId));
    }
  };

  const handlePictureUpload = (event) => {
    const files = Array.from(event.target.files);

    // إنشاء كائنات صور جديدة مع معرفات مؤقتة
    const newPictures = files.map((file, index) => ({
      id: `temp-${Date.now()}-${index}`, // معرف مؤقت
      room_picture: URL.createObjectURL(file), // إنشاء URL مؤقت للعرض
      file: file, // حفظ الملف الأصلي للرفع لاحقاً
      isNew: true, // علامة لتحديد أنها صورة جديدة
    }));

    // إضافة الصور الجديدة للصور الحالية
    setCurrentPictures((prev) => [...prev, ...newPictures]);

    // إعادة تعيين input الملف
    event.target.value = "";
  };

  const handleSaveChanges = async () => {
    setEditLoading(true);
    try {
      // إنشاء FormData لإرسال البيانات والصور
      const formData = new FormData();

      // إضافة البيانات النصية
      formData.append("price", editData.price);
      formData.append("area", editData.area);
      formData.append("people_count", editData.people_count);
      formData.append("description", editData.description);

      // إضافة سعر العرض إذا كان موجوداً
      if (editData.offer_price && editData.offer_price !== "") {
        formData.append("offer_price", editData.offer_price);
      }

      // فصل الصور الجديدة والقديمة من currentPictures
      const newPictures = currentPictures.filter((pic) => pic.isNew);
      const oldPictures = currentPictures.filter((pic) => !pic.isNew);

      // إضافة الصور الجديدة
      newPictures.forEach((pic) => {
        formData.append("images[]", pic.file);
      });

      // إضافة معرفات الصور القديمة المتبقية
      // API ستحذف تلقائياً الصور التي لم تكن في هذه القائمة
      if (oldPictures.length > 0) {
        const oldPictureIds = oldPictures.map((pic) => pic.id);
        formData.append("remaining_picture_ids", JSON.stringify(oldPictureIds));
      }

      console.log("Saving changes with FormData:", {
        price: editData.price,
        area: editData.area,
        people_count: editData.people_count,
        description: editData.description,
        offer_price: editData.offer_price,
        newImagesCount: newPictures.length,
        remainingPictureIds: oldPictures.map((pic) => pic.id),
        deletedPictureIds: deletedPictures.map((pic) => pic.id), // للتوضيح فقط
      });

      // إرسال البيانات باستخدام FormData
      await axios.post(`http://127.0.0.1:8000/api/EditRoom/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // مهم للصور
        },
      });

      // تنظيف URLs المؤقتة بعد الحفظ
      currentPictures.forEach((pic) => {
        if (pic.isNew && pic.room_picture) {
          URL.revokeObjectURL(pic.room_picture);
        }
      });

      setIsEditing(false);

      // إعادة تحميل البيانات لعرض التحديثات
      const res = await axios.get(`http://127.0.0.1:8000/api/ShowRoom/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
      setCurrentPictures(res.data.pictures); // حفظ الصور الحالية
      setEditData({
        price: res.data.room.price,
        offer_price: res.data.room.offer_price || "",
        area: res.data.room.area,
        people_count: res.data.room.people_count,
        description: res.data.room.description,
        pictures: res.data.pictures,
      });

      // إعادة تعيين قائمة الصور المحذوفة
      setDeletedPictures([]);
    } catch (err) {
      console.error("Error saving changes:", err);
      alert(
        "حدث خطأ أثناء حفظ التغييرات: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setEditLoading(false);
    }
  };

  const handleCancelEdit = () => {
    // تنظيف URLs المؤقتة للصور الجديدة
    currentPictures.forEach((pic) => {
      if (pic.isNew && pic.room_picture) {
        URL.revokeObjectURL(pic.room_picture);
      }
    });

    // إعادة تعيين الصور الحالية
    setCurrentPictures(data.pictures);

    // إعادة تعيين قائمة الصور المحذوفة
    setDeletedPictures([]);

    setIsEditing(false);
    // إعادة تعيين البيانات الأصلية
    if (data) {
      setEditData({
        price: data.room.price,
        offer_price: data.room.offer_price || "",
        area: data.room.area,
        people_count: data.room.people_count,
        description: data.room.description,
        pictures: data.pictures,
      });
    }
  };

  const handleDeleteRoom = async () => {
    setDeleteLoading(true);
    try {
      await axios.get(`http://127.0.0.1:8000/api/DeleteRoom/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/Accommodation/dashboard/rooms");
    } catch (err) {
      alert("Error deleting room: " + (err.response?.data?.message || err.message));
    } finally {
      setDeleteLoading(false);
      setShowDeleteDialog(false);
    }
  };

  if (loading)
    return <Loader/>;
  if (error) return <div className="room-details-error">{error}</div>;
  if (!data) return null;

  const { room, pictures } = data;

  // واجهة التعديل
  if (isEditing) {
    return (
      <div className="room-edit-container">
        <div className="room-edit-header">
          <h2>Room {room.id} Editing</h2>
          <div className="edit-actions">
            <button
              className="edit-btn cancel"
              onClick={handleCancelEdit}
              disabled={editLoading}
            >
              Cancel
            </button>
            <button
              className="edit-btn save"
              onClick={handleSaveChanges}
              disabled={editLoading}
            >
              {editLoading ? "جاري الحفظ..." : "Save"}
            </button>
          </div>
        </div>

        <div className="room-edit-content">
          <div className="edit-form-section">
            <h3>Room Information</h3>
            <div className="inputbox">
              <input
                required="required"
                type="number"
                value={editData.price}
                onChange={(e) =>
                  handleInputChange("price", parseFloat(e.target.value))
                }
              />
              <span>Price</span>
              <i></i>
            </div>
              <div className="inputbox">
                <input
                  type="number"
                  required="required"
                  value={editData.offer_price === "" ? "" : editData.offer_price}
                  onChange={e =>
                    handleInputChange(
                      "offer_price",
                      e.target.value === "" ? "" : parseFloat(e.target.value)
                    )
                  }
                />
                <span>Offer Price (Optinal)</span>
                <i></i>
              </div>
            <div className="inputbox">
              <input
                required="required"
                type="number"
                value={editData.area}
                onChange={(e) =>
                  handleInputChange("area", parseFloat(e.target.value))
                }
              />
              <span>Area</span>
              <i></i>
            </div>
            <div className="inputbox">
              <input
                required="required"
                type="number"
                value={editData.people_count}
                onChange={(e) =>
                  handleInputChange("people_count", parseInt(e.target.value))
                }
              />
              <span>Person's number</span>
              <i></i>
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
              className="description"
                value={editData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Room description"
                rows="4"
              />
            </div>
          </div>

          <div className="edit-pictures-section">
            <h3>Room's Photos</h3>
            <div className="pictures-grid">
              {/* عرض جميع الصور من currentPictures */}
              {currentPictures.map((pic) => (
                <div key={pic.id} className="picture-item">
                  <img
                    src={
                      pic.isNew
                        ? pic.room_picture // للصور الجديدة، استخدم URL المؤقت
                        : pic.room_picture.startsWith("http")
                        ? pic.room_picture
                        : `http://localhost:8000/${pic.room_picture}`
                    }
                    alt={`Room picture ${pic.id}`}
                  />
                  <button
                    className="delete-picture-btn"
                    onClick={() => handlePictureDelete(pic.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="add-picture-section">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePictureUpload}
                id="picture-upload"
                style={{ display: "none" }}
              />
              <label htmlFor="picture-upload" className="add-picture-btn">
                Add Photo
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // واجهة العرض العادية
  return (
    <div className="room-details-container">
      {/* زر التعديل العائم */}
      <button
        className="floating-edit-btn"
        onClick={() => setIsEditing(true)}
        title="تعديل الغرفة"
      >
        <i className="fa-solid fa-edit"></i>
      </button>
      {/* زر حذف عائم */}
      <button
        className="floating-delete-btn"
        style={{ bottom: 80 }}
        onClick={() => setShowDeleteDialog(true)}
        title="حذف الغرفة"
        disabled={deleteLoading}
      >
        <i className="fa-solid fa-trash"></i>
      </button>
      {showDeleteDialog && (
        <ConfirmDialog
          message="Are you sure you want to delete this room? This action cannot be undone."
          onConfirm={handleDeleteRoom}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}

      <div className="room-pictures-section" style={{ width: "85%" }}>
        <h2 className="room-pictures-title">Pictures</h2>
        <div
          className="room-pictures-slider-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="room-pictures-slider"
            ref={sliderRef}
            style={{
              overflowX: "auto",
              scrollBehavior: "smooth",
              display: "flex",
              gap: "20px",
              justifyContent: pictures.length < 4 ? "center" : undefined,
            }}
          >
            {pictures.length > 0 ? (
              pictures.length > 4
                ? [...pictures, ...pictures, ...pictures].map((pic, idx) => (
                    <div className="room-picture-card" key={`pic-${pic.id}-${idx}`}>
                      <img
                        className="room-picture-img"
                        src={
                          pic.room_picture.startsWith("http")
                            ? pic.room_picture
                            : `http://localhost:8000/${pic.room_picture}`
                        }
                        alt={`Room pic ${(idx % pictures.length) + 1}`}
                      />
                    </div>
                  ))
                : pictures.map((pic, idx) => (
                    <div className="room-picture-card" key={`pic-${pic.id}-${idx}`}>
                      <img
                        className="room-picture-img"
                        src={
                          pic.room_picture.startsWith("http")
                            ? pic.room_picture
                            : `http://localhost:8000/${pic.room_picture}`
                        }
                        alt={`Room pic ${idx + 1}`}
                      />
                    </div>
                  ))
            ) : (
              <div className="room-picture-empty">No pictures available</div>
            )}
          </div>
          {pictures.length >= 4 && (
            <>
              <button
                className="slider-arrow left"
                onClick={() => scrollSlider("left")}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button
                className="slider-arrow right"
                onClick={() => scrollSlider("right")}
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </>
          )}
        </div>
      </div>
      <div
        className="room-details-card"
        style={{ maxWidth: 600, width: "100%" }}
      >
        <h2 className="room-details-title">Room Details</h2>
        <div className="room-details-section">
          <b>ID:</b> {room.id}
        </div>
        <div className="room-details-section">
          <b>Price:</b>{" "}
          {room.offer_price !== null &&
          room.offer_price !== "" &&
          room.offer_price !== 0.0 ? (
            <>
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#b23c3c",
                  marginRight: 8,
                }}
              >
                {room.price}$
              </span>
              <span style={{ color: "#2e7d32", fontWeight: "bold" }}>
                {room.offer_price}$
              </span>
            </>
          ) : (
            <span style={{ color: "#2e7d32", fontWeight: "bold" }}>
              {room.price}$
            </span>
          )}
        </div>
        <div className="room-details-section">
          <b>Area:</b> {room.area} m²
        </div>
        <div className="room-details-section">
          <b>People Count:</b> {room.people_count}
        </div>
        <div className="room-details-section">
          <b>Description:</b> {room.description}
        </div>
      </div>
    </div>
  );
}
