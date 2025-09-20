import ProvidersList from "@/components/dashboard/providers-list";

export default function WeddingBookmarksTab({ user, bookmarks }) {
    return (
        <ProvidersList providers={bookmarks} />
    );
}
