const contentMap = {
  site: "https://ayx-cctv.com",
  keywords: ["ayx", "news", "sports", "entertainment", "live"],
  sections: [
    {
      id: "section-1",
      name: "头条",
      tags: ["breaking", "top", "ayx"],
      items: [
        { title: "今日要闻", url: "/headlines/today", tags: ["ayx", "breaking"] },
        { title: "深度报道", url: "/headlines/deep", tags: ["ayx", "analysis"] }
      ]
    },
    {
      id: "section-2",
      name: "体育",
      tags: ["sports", "live", "ayx"],
      items: [
        { title: "足球直播", url: "/sports/football", tags: ["live", "ayx"] },
        { title: "篮球集锦", url: "/sports/basketball", tags: ["highlights", "ayx"] }
      ]
    },
    {
      id: "section-3",
      name: "娱乐",
      tags: ["entertainment", "ayx"],
      items: [
        { title: "热门影视", url: "/entertainment/movies", tags: ["movie", "ayx"] },
        { title: "音乐榜单", url: "/entertainment/music", tags: ["music", "ayx"] }
      ]
    }
  ]
};

function searchContent(query) {
  query = query.toLowerCase().trim();
  if (!query) return [];

  const results = [];

  contentMap.sections.forEach(section => {
    section.items.forEach(item => {
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchTags = item.tags.some(tag => tag.toLowerCase().includes(query));
      const matchSectionTags = section.tags.some(tag => tag.toLowerCase().includes(query));

      if (matchTitle || matchTags || matchSectionTags) {
        results.push({
          section: section.name,
          title: item.title,
          url: item.url,
          matched: query
        });
      }
    });
  });

  return results;
}

function filterByTag(tag) {
  const tagLower = tag.toLowerCase().trim();
  if (!tagLower) return [];

  const filtered = [];

  contentMap.sections.forEach(section => {
    section.items.forEach(item => {
      if (item.tags.some(t => t.toLowerCase() === tagLower)) {
        filtered.push({
          section: section.name,
          title: item.title,
          url: item.url,
          tag: tagLower
        });
      }
    });
  });

  return filtered;
}

function getAllTags() {
  const tagSet = new Set();

  contentMap.sections.forEach(section => {
    section.tags.forEach(tag => tagSet.add(tag));
    section.items.forEach(item => {
      item.tags.forEach(tag => tagSet.add(tag));
    });
  });

  return Array.from(tagSet);
}

function getItemsBySection(sectionId) {
  const section = contentMap.sections.find(sec => sec.id === sectionId);
  if (!section) return [];

  return section.items.map(item => ({
    title: item.title,
    url: item.url,
    tags: item.tags
  }));
}

function countItems() {
  let total = 0;
  contentMap.sections.forEach(section => {
    total += section.items.length;
  });
  return total;
}

console.log("Content Map Loaded from:", contentMap.site);
console.log("Total Items:", countItems());
console.log("Available Tags:", getAllTags());

// Example usage
const searchResult = searchContent("ayx");
console.log("Search Results for 'ayx':", searchResult.length);

const tagFilterResult = filterByTag("live");
console.log("Filter by tag 'live':", tagFilterResult.length);