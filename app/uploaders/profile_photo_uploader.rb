class ProfilePhotoUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  process resize_to_fit: [200, 200]

  version :thumb do
    process resize_to_fill: [45,45]
  end

  if Rails.env.test?
    storage :file
  else
    storage :fog
  end

# # to be checked later:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
end
