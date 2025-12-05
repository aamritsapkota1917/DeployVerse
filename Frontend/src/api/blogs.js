import axios from "axios";

export const publishBlog = async (tags) => {
  const blogData = JSON.parse(localStorage.getItem("value"));

  const getFirstImageUrl = (doc) => {
    for (const key in doc) {
      const block = doc[key];
      const node = block?.value?.[0];

      if (node?.type === "image") {
        return node.props?.src;
      }
    }
    return null;
  };

  const getFirstSentence = (doc) => {
    const blocks = Object.values(doc).sort((a, b) => a.meta.order - b.meta.order);

    for (const block of blocks) {
      const node = block?.value?.[0];

      if (!node?.children) continue;

      const text = node.children
        .map((c) => c.text || "")
        .join("")
        .trim();

      if (!text) continue;

      // Extract first sentence
      const match = text.match(/[^.!?]+[.!?]?/);
      return match ? match[0].trim() : text;
    }

    return "";
  };

  const getDescription = (doc, limit = 119) => {
    const blocks = Object.values(doc).sort((a, b) => a.meta.order - b.meta.order);

    let seenFirst = false;
    let description = "";

    for (const block of blocks) {
      const node = block?.value?.[0];

      if (!node?.children) continue;

      const text = node.children
        .map((c) => c.text || "")
        .join("")
        .trim();

      if (!text) continue; // skip empty blocks

      if (!seenFirst) {
        seenFirst = true; // skip first non-empty block (title)
        continue;
      }

      // Add text until limit is reached
      const remaining = limit - description.length;
      if (remaining <= 0) break;

      description += text.slice(0, remaining) + " ";
    }

    const finalText = description.trim();
    return finalText.length >= limit ? finalText.slice(0, limit) + "..." : finalText;
  };

  const title = getFirstSentence(blogData);

  if (title === "") {
    throw new Error("Blog content is empty");
  }

  const content = blogData;
  const image = getFirstImageUrl(blogData);

  tags = Array.from(tags).length === 0 ? ["General"] : Array.from(tags);

  const description = getDescription(blogData);

  const final_data = { title, content, topics: tags, image, description };

  console.log(final_data);

  try {
    const response = await axios.post("/api/blogs", final_data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      localStorage.removeItem("value");
    }
    if (response.status !== 201) {
      throw new Error("Failed to publish blog");
    }
  } catch (error) {
    console.error("Error publishing blog:", error);
    throw error;
  }
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post("/api/blogs/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
