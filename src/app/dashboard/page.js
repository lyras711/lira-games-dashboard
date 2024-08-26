import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserData } from "./actions";
import { TopUpModal } from "@/components/top-up-modal";
import { WithdrawModal } from "@/components/withdraw-modal";

export default async function Dashboard() {

  // get user data from firebase
  // get subscription plan from firebase

  const user = await getUserData()

  const balance = user.fields.Balance.integerValue;
  const currentXP = user.fields.CurrentXP.doubleValue;
  const achievements = user.fields.Achievements.arrayValue;
  const username = user.fields.Username.stringValue;
  const currentLevel = user.fields.CurrentLevel.integerValue;
  const coins = user.fields.coins.integerValue;
  console.log(user.fields);
  return (
    <div className="flex flex-col items-start justify-center p-4">
      <h1 className="text-2xl font-bold mt-4">Welcome {username}</h1>

      {/* 3 column grid showing balance, xp, and level */}
      <div className="flex flex-col md:grid md:grid-cols-5 md:gap-3 items-start justify-between mt-4 lg:mt-6">
        <Card className="md:col-span-2">
          <CardHeader className="text-center">
            <h4 className="text-lg font-medium leading-none tracking-tight">Coins</h4>
          </CardHeader>
          <CardContent className="text-center flex flex-col items-center justify-center">
            <div className="space-y-4">
              <p className="text-2xl font-bold">{balance}</p>
            </div>
            <div className="flex space-x-2 mt-4">
              <WithdrawModal
                user={{
                  username: username,
                }}
              />
              <TopUpModal email={user.email} />
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="text-center">
            <h4 className="text-lg font-medium leading-none tracking-tight">Current XP</h4>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <p className="text-2xl font-bold">{currentXP}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="text-center">
            <h4 className="text-lg font-medium leading-none tracking-tight">Current Level</h4>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <p className="text-2xl font-bold">{currentLevel}</p>
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
            <Card className="flex flex-col text-center">
              <CardHeader className="text-center border-b border-gray-300">
                <h4 className="text-lg font-medium leading-none tracking-tight">Free</h4>
                </CardHeader>
                <CardContent className="h-full p-6">
                  <div className="flex flex-col space-y-4">
                    <span className="text-sm font-medium">Access to all LiRA games</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center text-center border-t border-gray-300 pt-4">
                  <Button disabled variant="outline">Selected</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col text-center">
                <CardHeader className="text-center  border-b border-gray-300 flex flex-col items-center justify-center gap-2">
                  <h4 className="text-lg font-medium leading-none tracking-tight">Competitor</h4>
                  <span className="text-sm font-medium">4.99€ <span className="text-xs font-normal">/mo</span></span>
                </CardHeader>
                <CardContent className="h-full p-6">
                  <div className="flex flex-col space-y-4">
                    <span className="text-sm font-medium">LiRA Events</span>
                    <span className="text-sm font-medium">Enter Tournaments</span>
                    <span className="text-sm font-medium">Avatar Customization</span>
                    <span className="text-sm font-medium">Battle-pass access</span>
                    <span className="text-sm font-medium">Personal invite link</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center text-center border-t border-gray-300 pt-4">
                  <a href="https://buy.stripe.com/5kA28g2g9b18agE000" rel="noreferrer" target="_blank">
                    <Button>Select</Button>
                  </a>
                </CardFooter>
              </Card>
              <Card className="flex flex-col text-center">
              <CardHeader className="text-center border-b border-gray-300 flex flex-col items-center justify-center gap-2">
                  <h4 className="text-lg font-medium leading-none tracking-tight">Creator</h4>
                  <span className="text-sm font-medium">14.99€ <span className="text-xs font-normal">/mo</span></span>
                </CardHeader>
                <CardContent className="h-full p-6">
                  <div className="flex flex-col space-y-4">
                    <span className="text-sm font-medium">Access to all games</span>
                    <span className="text-sm font-medium">All Events</span>
                    <span className="text-sm font-medium">Enter Tournaments</span>
                    <span className="text-sm font-medium">Avatar / App Customization</span>
                    <span className="text-sm font-medium">Battle-pass access</span>
                    <span className="text-sm font-medium">Personal invite link</span>
                    <span className="text-sm font-medium">Create / publish games and earn</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center text-center border-t border-gray-300 pt-4">
                  <a href="https://buy.stripe.com/8wM7sA6wp1qybkI145" rel="noreferrer" target="_blank">
                    <Button>Select</Button>
                  </a>
                </CardFooter>
              </Card>
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
