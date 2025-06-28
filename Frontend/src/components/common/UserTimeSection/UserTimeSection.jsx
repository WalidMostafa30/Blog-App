import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const UserTimeSection = ({ link, image, userName, time }) => {
  return (
    <Link to={link} className="flex items-center gap-2">
      <span className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden">
        <img
          src={image}
          alt={userName}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </span>

      <div>
        <h4 className="text-lg font-bold line-clamp-1 capitalize">
          {userName}
        </h4>
        <p className="text-sm text-main-clr font-semibold">
          {dayjs(time).fromNow()}
        </p>
      </div>
    </Link>
  );
};

export default UserTimeSection;
