export async function decorate(block) {
  const formURL = block.querySelector('a[href$=".json"]');

  if (!formURL) {
    console.error("No JSON URL");
    return;
  }

  try {
    const response = await fetch(formURL.href);
    const formData = await response.json();

    block.innerHTML = "";

    const createForm = (data) => {
      const formElement = document.createElement("form");

      data.forEach(({ Type, Label, Field, Placeholder }) => {
        const fieldWrapper = document.createElement("div");

        if (Type === "plaintext") {
          const plainText = document.createElement("p");
          plainText.textContent = Label;
          fieldWrapper.appendChild(plainText);
        } else {
          if (Type !== "submit") {
            const label = document.createElement("label");
            label.setAttribute("for", Field);
            label.textContent = Label;
            fieldWrapper.appendChild(label);
          }

          const input = document.createElement("input");
          input.type = Type;
          input.name = Field;
          input.id = Field;

          if (Placeholder) input.placeholder = Placeholder;
          if (Type === "submit") input.value = Label;

          fieldWrapper.appendChild(input);
        }

        formElement.appendChild(fieldWrapper);
      });

      block.appendChild(formElement);
    };

    createForm(formData.data);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}

export default decorate;
