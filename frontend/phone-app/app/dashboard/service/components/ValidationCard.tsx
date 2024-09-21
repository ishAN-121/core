import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Building2, Phone } from "lucide-react"

interface ValidationCardProps {
  data: {
    company_name: string
    is_scam_percentage: number
  }
}

export default function ValidationCard({ data }: ValidationCardProps) {
  const isHighRisk = data.is_scam_percentage > 70;

  const handleCall = ()=>{
    const id =  Math.floor(Math.random() * 100) + 1;
    window.location.href = `/call/${id}`
  }

  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardHeader className="bg-primaryGreen text-white p-6">
        <CardTitle className="flex items-center space-x-2 text-xl">
          <Building2 className="w-6 h-6"/>
          <span className="text-secondaryGreen">{data.company_name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Scam Risk Assessment</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{data.is_scam_percentage}%</span>
              <span className={`text-sm font-medium ${isHighRisk ? 'text-red-600' : 'text-green-600'}`}>
                {isHighRisk ? 'High Risk' : 'Low Risk'}
              </span>
            </div>
            <Progress 
              value={data.is_scam_percentage} 
              className="h-2 bg-gray-200"
              indicatorClassName={isHighRisk ? 'bg-red-500' : 'bg-green-500'}
            />
          </div>
          <p className="text-sm text-gray-600">
            {isHighRisk 
              ? "This company has a high risk of being associated with scams. Proceed with caution."
              : "This company appears to have a lower risk of being associated with scams."}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        {/* Simplify Button variant */}
        <Button className={`w-full text-lg h-12 ${isHighRisk ? "bg-red-500" : "bg-gray-500"}`} onClick={handleCall}>
          <Phone className="w-5 h-5 mr-2" />
          Call Now
        </Button>
      </CardFooter>
    </Card>
  )
}
