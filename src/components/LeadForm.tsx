import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { FormData } from '../types';
import { Loader, Send, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getDeviceInfo, getLocationInfo } from '../lib/tracking';

const LeadForm: React.FC<{ onSubmit: (data: FormData) => Promise<void> }> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLightTypes, setSelectedLightTypes] = useState<string[]>([]);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      product_type: 'lights',
      light_types: []
    }
  });
  
  const watchedFields = watch();
  
  useEffect(() => {
    setValue('phone', '+91 ');
    setValue('product_type', 'lights');
  }, [setValue]);

  useEffect(() => {
    setValue('light_types', selectedLightTypes);
  }, [selectedLightTypes, setValue]);

  const onSubmitForm = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const deviceInfo = getDeviceInfo();
      const locationInfo = await getLocationInfo();
     
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            name: data.name,
            phone: data.phone,
            city: locationInfo,
            email: data.email || null,
            lead_type: data.lead_type,
            product_type: 'lights',
            light_types: selectedLightTypes,
            comments: data.comments || null,
            device_info: deviceInfo,
            location_info: data.city,
            url_slugs: window.location.pathname.split('/').filter(Boolean)
          }
        ]);

      if (error) {
        console.error('Supabase error:', error);
        // If the error is related to the light_types column, try without it
        if (error.message && error.message.includes('light_types')) {
          const { error: fallbackError } = await supabase
            .from('leads')
            .insert([
              {
                name: data.name,
                phone: data.phone,
                city: locationInfo,
                email: data.email || null,
                lead_type: data.lead_type,
                product_type: 'lights',
                comments: data.comments || null,
                device_info: deviceInfo,
                location_info: data.city,
                url_slugs: window.location.pathname.split('/').filter(Boolean)
              }
            ]);
          
          if (fallbackError) throw fallbackError;
        } else {
          throw error;
        }
      }

      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still call onSubmit to show success modal even if database submission fails
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validatePhoneNumber = (value: string) => {
    const phoneNumber = parsePhoneNumberFromString(value, 'IN');
    if (!phoneNumber) {
      return 'Invalid phone number';
    }
    return phoneNumber.isValid() || 'Please enter a valid Indian phone number';
  };

  const handleLightTypeToggle = (type: string) => {
    setSelectedLightTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: // Light types selection
        return selectedLightTypes.length > 0;
      case 1: // Personal info
        return !!watchedFields.name && !!watchedFields.phone && !errors.name && !errors.phone;
      case 2: // Additional info
        return !!watchedFields.lead_type;
      default:
        return true;
    }
  };

  const renderStepIndicator = () => {
    const totalSteps = 3;
    
    return (
      <div className="flex justify-center mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep ? 'bg-[#1a5f7a] text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div 
                className={`w-10 h-1 ${
                  index < currentStep ? 'bg-[#1a5f7a]' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderLightTypesStep = () => (
    <div className="space-y-8">
      <h3 className="text-xl font-medium text-center text-gray-800 mb-6">What type of lights are you interested in?</h3>
      <p className="text-center text-gray-600 mb-6">Select all that apply</p>
      
      <div className="grid grid-cols-2 gap-4">
        {[
          { 
            id: 'chandeliers', 
            label: 'Chandeliers', 
            bgImage: '/images/Chandeliers.jpg'
          },
          { 
            id: 'pendant-lights', 
            label: 'Pendant Lights', 
            bgImage: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3'
          },
          { 
            id: 'wall-lights', 
            label: 'Wall Lights', 
            bgImage: 'images/wall_light.jpg'
          },
          { 
            id: 'outdoor-lights', 
            label: 'Outdoor Lights', 
            bgImage: 'images/outdoor.jpg'
          },
          { 
            id: 'table-lamps', 
            label: 'Table Lamps', 
            bgImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3'
          },
          { 
            id: 'other', 
            label: 'Other', 
            bgImage: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3'
          }
        ].map(light => (
          <button
            key={light.id}
            type="button"
            onClick={() => handleLightTypeToggle(light.id)}
            className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 overflow-hidden h-32 ${
              selectedLightTypes.includes(light.id) 
                ? 'border-[#1a5f7a]' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{
              backgroundImage: `url(${light.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
            {selectedLightTypes.includes(light.id) && (
              <div className="absolute inset-0 bg-[#1a5f7a]/30"></div>
            )}
            <span className={`relative text-lg font-medium text-white z-10 text-shadow`}>
              {light.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderPersonalInfoStep = () => (
    <div className="space-y-8">
      <h3 className="text-xl font-medium text-center text-gray-800 mb-6">Your Information</h3>
      
      <div className="relative">
        <input
          type="text"
          {...register('name', { 
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' }
          })}
          placeholder="Your Name"
          autoComplete="name"
          className="luxury-input"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="relative">
        <input
          type="tel"
          {...register('phone', {
            required: 'Phone number is required',
            validate: validatePhoneNumber
          })}
          placeholder="Phone Number"
          autoComplete="tel"
          className="luxury-input"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>
    </div>
  );

  const renderAdditionalInfoStep = () => (
    <div className="space-y-8">
      <h3 className="text-xl font-medium text-center text-gray-800 mb-6">Additional Information</h3>
      
      <div className="relative">
        <select
          {...register('lead_type', {
            required: 'Please select an option'
          })}
          className="luxury-input"
          defaultValue=""
        >
          <option value="" disabled>Please Select</option>
          <option value="intereted_to_buy">Interested To Buy</option>
          <option value="architect">Architect</option>
          <option value="interior_designer">Interior Designer</option>
          <option value="just_curious">Just Curious</option>
          <option value="other">Other</option>
        </select>
        {errors.lead_type && (
          <p className="mt-1 text-sm text-red-500">{errors.lead_type.message}</p>
        )}
      </div>

      <div className="relative">
        <textarea
          {...register('comments')}
          placeholder="Your Message (Optional)"
          className="luxury-input min-h-[100px] resize-y"
        />
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderLightTypesStep();
      case 1:
        return renderPersonalInfoStep();
      case 2:
        return renderAdditionalInfoStep();
      default:
        return null;
    }
  };

  const totalSteps = 3;

  return (
    <form 
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-8 max-w-xl mx-auto"
      autoComplete="on"
    >
      {renderStepIndicator()}
      
      {renderCurrentStep()}
      
      <div className="flex justify-between mt-8">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center justify-center gap-2 border-2 border-[#1a5f7a] text-[#1a5f7a] px-6 py-3 rounded-full hover:bg-[#1a5f7a]/10 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        )}
        
        {currentStep < totalSteps - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!isStepValid()}
            className={`ml-auto flex items-center justify-center gap-2 bg-[#1a5f7a] text-white px-6 py-3 rounded-full transition-all duration-300 ${
              isStepValid() ? 'hover:bg-[#2c3e50]' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            Next
            <ArrowRight size={18} />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting || !isStepValid()}
            className={`ml-auto bg-[#1a5f7a] hover:bg-[#2c3e50] text-white font-medium py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center group ${
              isStepValid() ? '' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin mr-2" size={20} />
                Processing...
              </>
            ) : (
              <>
                <span className="mr-2">Get Exclusive Access</span>
                <Send size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default LeadForm;