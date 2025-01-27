export default async function decorate(block) {
  console.log("Decorate function called");
  console.log("Block:", block);

  const path = window.location.pathname;

  const pathSegments = path.split("/").filter((segment) => segment);

  let breadcrumbHTML = "<nav><ol>";

  let currentPath = "";

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    if (index < pathSegments.length - 1) {
      breadcrumbHTML += `<li><a href="${currentPath}/">${segment}</a></li>`;
    } else {
      breadcrumbHTML += `<li>${segment}</li>`;
    }
  });

  breadcrumbHTML += "</ol></nav>";

  block.innerHTML = breadcrumbHTML;
  console.log("Breadcrumb structure added");
}
