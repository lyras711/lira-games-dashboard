import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCurrentUser } from "@/actions/users";
import CoinsCard from "@/components/coins-card";
// import { firebaseAuth } from "@/lib/firebase/config";
// import { getCurrentUser } from "@/lib/firebase/auth";
import { getSession } from "@/actions/auth-actions";
import { SubscriptionCard } from "@/components/ui/subscription-card";
export default async function Dashboard() {

  // get user data from firebase
  // get subscription plan from firebase

  const user = await getCurrentUser();
  console.log(user);
  return (
    <div className="flex flex-col items-start justify-center p-4">
      <h1 className="text-2xl font-bold mt-4">Welcome {user.username}</h1>

      {/* 3 column grid showing balance, xp, and level */}
      <div className="flex flex-col md:grid md:grid-cols-5 md:gap-3 items-start justify-between mt-4 lg:mt-6">
        <CoinsCard
          username={user.username}
          email={user.email}
          balance={user.balance}
        />

        <Card className="h-full">
          <CardHeader className="text-center">
            <h4 className="text-lg font-medium leading-none tracking-tight">Current XP</h4>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <p className="text-2xl font-bold">{user.currentXP}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="text-center">
            <h4 className="text-lg font-medium leading-none tracking-tight">Current Level</h4>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <p className="text-2xl font-bold">{user.currentLevel}</p>
            </div>
          </CardContent>
        </Card>
        
      </div>

      <div className="flex flex-col md:grid md:grid-cols-5 md:gap-3 items-start justify-start mt-4 lg:mt-6">
        <Card className="md:col-span-full">
          <CardHeader>
            <h4 className="text-lg font-medium leading-none tracking-tight">Change Subscription Plan</h4>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 space-x-4">
              <SubscriptionCard
                email={user.email}
                title="Free"
                price="4.99"
                price_id="price_1PzYwmP8KW8pdlk1SWE0gwgd"
                isSelected={user.tier === 0}
              >
                <span className="text-sm font-medium">Access to all LiRA games</span>
              </SubscriptionCard>
              <SubscriptionCard
                email={user.email}
                title="Competitor"
                price="4.99"
                price_id="price_1PzYx5P8KW8pdlk180QtveQ4"
                isSelected={user.tier === 1}
              >
                <span className="text-sm font-medium">LiRA Events</span>
                <span className="text-sm font-medium">Enter Tournaments</span>
                <span className="text-sm font-medium">Avatar Customization</span>
                <span className="text-sm font-medium">Battle-pass access</span>
                <span className="text-sm font-medium">Personal invite link</span>
              </SubscriptionCard>
              <SubscriptionCard
                email={user.email}
                title="Creator"
                price="14.99"
                price_id="price_1PzYxIP8KW8pdlk1DyVHgOPp"
                isSelected={user.tier === 2}
              >
                <span className="text-sm font-medium">Access to all games</span>
                <span className="text-sm font-medium">All Events</span>
                <span className="text-sm font-medium">Enter Tournaments</span>
                <span className="text-sm font-medium">Avatar / App Customization</span>
                <span className="text-sm font-medium">Battle-pass access</span>
                <span className="text-sm font-medium">Personal invite link</span>
                <span className="text-sm font-medium">Create / publish games and earn</span>
              </SubscriptionCard>
            </div>
          </CardContent>
        </Card>
        {/* <div className="flex flex-col space-y-4 col-span-2">
          <Card>
            <CardHeader>
              <h4 className="text-lg font-medium leading-none tracking-tight">Top Up Account</h4>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input 
                  type="number" 
                  value={0} 
                  // onChange={() => { return; }} 
                  placeholder="Enter amount" 
                />
                <Button>Top Up</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h4 className="text-lg font-medium leading-none tracking-tight">Withdraw</h4>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input 
                  type="number" 
                  value={0} 
                  // onChange={() => { return; }} 
                  placeholder="Enter amount" 
                />
                <Button>Withdraw</Button>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
};
