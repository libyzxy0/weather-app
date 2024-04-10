import { Icon } from '@iconify/react';

type InfoCardProps = {
  name: string, 
  n: string, 
  ic: string
}
export function InfoCard({name, n, ic}: InfoCardProps) {
  return (
    <div className="flex items-center justify-between border-b-2 dark:border-gray-800 py-3 mb-1 mx-4 last:border-none">
            <div className="flex flex-row items-center">
              <Icon className="h-7 w-7 text-gray-400" icon={ic} />
              <h1 className="mx-1 text-gray-400 font-medium text-lg">{name}</h1>
            </div>
            <div>
              <h1 className="text-gray-400 font-medium text-lg mx-3">{n}</h1>
            </div>
          </div>
  )
}