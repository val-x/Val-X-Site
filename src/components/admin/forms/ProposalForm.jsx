import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

const defaultValues = {
  projectName: '',
  clientCompany: '',
  clientAddress: '',
  phases: [
    { name: 'Planning', duration: '15d', startDate: '2024-01-01' },
    { name: 'Development', duration: '30d' },
    { name: 'Testing', duration: '15d' },
    { name: 'Deployment', duration: '7d' }
  ],
  pricing: [
    { item: 'Development', cost: 40000 },
    { item: 'Infrastructure', cost: 20000 },
    { item: 'Testing & QA', cost: 15000 },
    { item: 'Project Management', cost: 15000 },
    { item: 'Training & Support', cost: 10000 }
  ],
  projectOverview: '',
  companyInfo: {
    yearsInBusiness: 5,
    completedProjects: 150,
    activeClients: 50,
    teamSize: 100
  }
};

const ProposalForm = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: initialData || defaultValues
  });

  // Add useFieldArray for phases
  const { 
    fields: phaseFields, 
    append: appendPhase, 
    remove: removePhase 
  } = useFieldArray({
    control,
    name: "phases"
  });

  // Add useFieldArray for pricing
  const { 
    fields: pricingFields, 
    append: appendPricing, 
    remove: removePricing 
  } = useFieldArray({
    control,
    name: "pricing"
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Project Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Project Information</h3>
        <div>
          <label className="block text-gray-400 mb-2">Project Name</label>
          <input
            {...register('projectName')}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Client Company</label>
          <input
            {...register('clientCompany')}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Client Address</label>
          <input
            {...register('clientAddress')}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Timeline</h3>
        <div className="grid grid-cols-1 gap-4">
          {phaseFields.map((field, index) => (
            <div key={field.id} className="flex space-x-4">
              <input
                {...register(`phases.${index}.name`)}
                placeholder="Phase Name"
                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
              <input
                {...register(`phases.${index}.duration`)}
                placeholder="Duration (e.g., 15d)"
                className="w-32 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
              <input
                {...register(`phases.${index}.startDate`)}
                type="date"
                className="w-40 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
              <button
                type="button"
                onClick={() => removePhase(index)}
                className="px-3 py-1 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendPhase({ name: '', duration: '', startDate: '' })}
            className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10"
          >
            Add Phase
          </button>
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Pricing</h3>
        <div className="grid grid-cols-1 gap-4">
          {pricingFields.map((field, index) => (
            <div key={field.id} className="flex space-x-4">
              <input
                {...register(`pricing.${index}.item`)}
                placeholder="Item"
                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
              <input
                {...register(`pricing.${index}.cost`)}
                placeholder="Cost"
                type="number"
                className="w-32 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
              <button
                type="button"
                onClick={() => removePricing(index)}
                className="px-3 py-1 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendPricing({ item: '', cost: '' })}
            className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10"
          >
            Add Item
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-violet-500 
          to-fuchsia-500 text-white"
      >
        Generate Document
      </button>
    </form>
  );
};

export default ProposalForm; 