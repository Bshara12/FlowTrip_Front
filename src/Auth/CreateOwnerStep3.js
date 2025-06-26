import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./CreateOwnerStep3.css";

const CreateOwnerStep3 = () => {
  const location = useLocation();
  const { categoryId, countryId } = location.state || {};

  const ACCOMMODATION_CATEGORY_ID = 1;
  const ACTIVITY_OWNER_CATEGORY_ID = 5;

  const [formData, setFormData] = useState({
    location: "",
    description: "",
    accommodation_type: "",
    activity_name: "",
    business_name: "",
  });

  const [accommodationTypes, setAccommodationTypes] = useState([]);
  const [activityList, setActivityList] = useState([]);
  const [categoryType, setCategoryType] = useState("");
  const [showCustomActivityField, setShowCustomActivityField] = useState(false);

  useEffect(() => {
    if (categoryId === ACCOMMODATION_CATEGORY_ID) {
      setCategoryType("accommodation");
      axios
        .get("http://127.0.0.1:8000/api/GetAllAccommodationTypes")
        .then((res) => {
          setAccommodationTypes(res.data.accommodation_types || []);
        })
        .catch((err) => {
          console.error("Error fetching accommodation types:", err);
        });
    } else if (categoryId === ACTIVITY_OWNER_CATEGORY_ID) {
      setCategoryType("activity");
      axios
        .get("http://127.0.0.1:8000/api/getAllActivity")
        .then((res) => {
          setActivityList(res.data.data || []);
        })
        .catch((err) => {
          console.error("Error fetching activities:", err);
        });
    } else {
      setCategoryType("other");
    }
  }, [categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "activity_name") {
      setShowCustomActivityField(value === "other");
      if (value !== "other") {
        setFormData((prev) => ({ ...prev, activity_name: value }));
      } else {
        setFormData((prev) => ({ ...prev, activity_name: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCustomActivityChange = (e) => {
    setFormData((prev) => ({ ...prev, activity_name: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submission = {
      owner_category_id: categoryId,
      country_id: countryId,
      ...formData,
    };

    if (categoryType !== "accommodation") delete submission.accommodation_type;
    if (categoryType !== "activity") delete submission.activity_name;

    console.log("Submitted Data:", submission);
  };

  return (
    <div className="owner-form-wrapper">
      <h2 className="form-title">Create New Owner</h2>
      <form className="owner-form" onSubmit={handleSubmit}>
        <input
          name="business_name"
          placeholder="Business Name"
          value={formData.business_name}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
        />

        {(categoryType === "accommodation" || categoryType === "activity") && (
          <>
            {categoryType === "accommodation" && (
              <select
                name="accommodation_type"
                value={formData.accommodation_type}
                onChange={handleChange}
                required
              >
                <option value="">Select Accommodation Type</option>
                {accommodationTypes.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            )}

            {categoryType === "activity" && (
              <>
                <select
                  name="activity_name"
                  onChange={handleChange}
                  value={showCustomActivityField ? "other" : formData.activity_name}
                  required
                >
                  <option value="">Select Activity</option>
                  {activityList.map((activity) => (
                    <option key={activity.id} value={activity.name}>
                      {activity.name}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>

                {showCustomActivityField && (
                  <input
                    name="activity_name"
                    placeholder="Enter Custom Activity"
                    value={formData.activity_name}
                    onChange={handleCustomActivityChange}
                    required
                    className="other-input"
                  />
                )}
              </>
            )}
          </>
        )}

        <button type="submit">إرسال</button>
      </form>
    </div>
  );
};

export default CreateOwnerStep3;
