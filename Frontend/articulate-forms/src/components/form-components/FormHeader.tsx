
import { Button } from '../ui/button'
import { Eye, Save } from 'lucide-react'
import { FormHeaderProps } from '@/types/form'


const FormHeader = ({ saveForm }: FormHeaderProps) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Form Builder</h1>
              <p className="text-sm sm:text-base text-white/80">Create beautiful, interactive forms</p>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <Button variant="secondary" size="sm" className="flex-1 sm:flex-none text-sm">
                <Eye className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="sm:inline">Preview</span>
              </Button>
              <Button variant="primary" size="sm" onClick={saveForm} className="flex-1 sm:flex-none text-sm">
                <Save className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="sm:inline">Save Form</span>
              </Button>
            </div>
          </div>
        </div>
  )
}

export default FormHeader