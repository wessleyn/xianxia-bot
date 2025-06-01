import EmptyState from "../../../components/EmptyState";

const CurrentEmptyState= () => {
  return (
    <EmptyState
      title="No current readings"
      description="You don't have any novels in progress. Start reading to see them here."
      actionLabel="Find Novels"
      actionPath="/"
    />
  );
};

export default CurrentEmptyState;