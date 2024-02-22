export interface RawRepoData {
  repository: {
    id: string,
    html_url: string;
    name: string;
    description: string;
    owner: {
      avatar_url: string;
      login: string;
    }
  };
  totalOpenIssues: number;
}

export interface FormattedRepoData {
  id: string,
  html_url: string;
  name: string;
  description: string;
  avatar_url: string;
  login: string;
  totalOpenIssues?: number;
}

export const getRandomRepository = async (): Promise<RawRepoData> => {
  try {
    const response = await fetch(`https://api.github.com/repositories`);
    const data = await response.json();

    // Select a random repository
    const randomIndex = Math.floor(Math.random() * data.length);
    const rawData = data[randomIndex];

    // Fetch total number of open issues for the selected repository
    const issuesResponse = await fetch(`https://api.github.com/search/issues?q=repo:${rawData.full_name}+type:issue+state:open`);
    const issuesData = await issuesResponse.json();
    const totalOpenIssues = issuesData.total_count;

    return {
      repository: rawData,
      totalOpenIssues: totalOpenIssues
    };
  } catch (error) {
    throw new Error('Error fetching random repository: ' + error);
  }
};

export const saveProject = (key: string, value: FormattedRepoData | undefined) => {
  // Retrieve existing items from local storage
  const existingItems = JSON.parse(localStorage.getItem(key) as string) || [];

  if (!existingItems.find((item: FormattedRepoData) => item.id === value?.id)) {
    // Add the new value to the existing items
    existingItems.push(value);

    // Write the updated items back to local storage
    localStorage.setItem(key, JSON.stringify(existingItems));
  }
}