import CustomView from "@//components/custom/CustomView";
import { Link } from "expo-router";
import { Text } from "react-native";

export default function History() {
  return (
    <CustomView className="items-center justify-center">
      <Text className="font-bold mb-5 text-3xl">History</Text>
      <Text className="text-gray-500 px-10 text-center">
        This is where you'll see your reading history and progress.
      </Text>

      <Link asChild href={
        {
          pathname: '/novel/[novelLink]',
          params: {
            novelLink: 'https://novelbin.me/novel-book/is-it-wrong-to-abusing-cartoon-tropes-in-dungeon'
          }
        }
      } >
        <Text className="text-blue-600 mt-10 underline underline-offset-1">Dev Link to Details</Text>
      </Link>
    </CustomView>
  );
}
